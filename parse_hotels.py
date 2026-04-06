#!/usr/bin/env python3
"""Parse hotels from gdeotel.ru for Yoshkar-Ola"""
import requests
from bs4 import BeautifulSoup
import json
import time
import re

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

LISTING_URL = 'https://gdeotel.ru/%D0%BE%D1%82%D0%B5%D0%BB%D0%B8/%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F/%D0%9C%D0%B0%D1%80%D0%B8%D0%B9-%D0%AD%D0%BB/%D0%99%D0%BE%D1%88%D0%BA%D0%B0%D1%80-%D0%9E%D0%BB%D0%B0'


def get_hotel_urls():
    """Get list of hotel detail page URLs from listing page"""
    resp = requests.get(LISTING_URL, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, 'html.parser')
    
    urls = []
    for a in soup.find_all('a', href=True):
        href = a['href']
        if '/отель/Россия/' in href or '/%D0%BE%D1%82%D0%B5%D0%BB%D1%8C/%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F/' in href:
            full_url = href if href.startswith('http') else f'https://gdeotel.ru{href}'
            if full_url not in urls:
                urls.append(full_url)
    return urls


def parse_hotel_detail(url):
    """Parse a single hotel detail page"""
    print(f"  Fetching: {url}")
    resp = requests.get(url, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    html = resp.text
    soup = BeautifulSoup(html, 'html.parser')
    
    hotel = {'source_url': url}
    text = soup.get_text()
    
    # Name from h1
    h1 = soup.find('h1')
    if h1:
        hotel['name'] = h1.get_text(strip=True).split(',')[0].strip()
    
    # Rating from HotelReviews_scoreBadge, reviews from HotelReviews_voices
    score_badge = soup.find(class_=re.compile(r'HotelReviews_scoreBadge'))
    if score_badge:
        rm = re.match(r'(\d+[,.]?\d*)', score_badge.get_text(strip=True))
        if rm:
            hotel['rating'] = float(rm.group(1).replace(',', '.'))
    voices = soup.find(class_=re.compile(r'HotelReviews_voices'))
    if voices:
        rvm = re.search(r'(\d+)', voices.get_text(strip=True))
        if rvm:
            hotel['reviewCount'] = int(rvm.group(1))
    if 'rating' not in hotel:
        rating_match = re.search(r'(\d[,.]\d)\s*(?:отлично|очень хорошо|хорошо|удовлетворительно)', text)
        if rating_match:
            hotel['rating'] = float(rating_match.group(1).replace(',', '.'))
    if 'reviewCount' not in hotel:
        reviews_match = re.search(r'(\d+)\s*отзыв', text)
        if reviews_match:
            hotel['reviewCount'] = int(reviews_match.group(1))
    
    # Address - from the header area near "Посмотреть на карте"
    addr_el = soup.find(string=re.compile(r'Посмотреть на карте'))
    if addr_el:
        parent = addr_el.find_parent()
        if parent and parent.parent:
            container_text = parent.parent.get_text(strip=True)
            # Address is text before "Посмотреть на карте"
            parts = container_text.split('Посмотреть на карте')
            if parts[0]:
                # Clean up - get text after rating/review info
                addr_text = parts[0].strip()
                # Remove trailing digits (image count)
                addr_text = re.sub(r'\d+$', '', addr_text).strip()
                # Try to extract just the address
                addr_match = re.search(r'([А-Яа-яёЁA-Za-z][А-Яа-яёЁA-Za-z\s.]+(?:улица|ул\.|проспект|пер\.|переулок|бульвар|шоссе|тракт)[^,]*,?\s*(?:д\.?\s*)?\d+[А-Яа-яёЁ]?)', addr_text)
                if addr_match:
                    hotel['address'] = addr_match.group(1).strip() + ', Йошкар-Ола'
                else:
                    # Fallback - look for pattern with street number
                    addr_match2 = re.search(r'([А-Яа-яёЁA-Za-z][^,]+\d+[А-Яа-яёЁ]?),\s*Йошкар-Ола', addr_text)
                    if addr_match2:
                        hotel['address'] = addr_match2.group(1).strip() + ', Йошкар-Ола'
    
    if 'address' not in hotel:
        # Fallback from main description
        addr_match = re.search(r'по адресу\s+([^.]+?)(?:\.|,\s*в\s)', text)
        if addr_match:
            hotel['address'] = addr_match.group(1).strip() + ', Йошкар-Ола'
    
    # Amenities from amenity tags (spans/divs with specific classes)
    amenities = []
    amenity_keywords = [
        'Wi-Fi', 'Парковка', 'Ресторан', 'Бассейн', 'Спа', 'Фитнес',
        'Лифт', 'Кондиционер', 'Прачечная', 'Халат', 'Сейф', 'Бар',
        'Трансфер', 'Конференц-зал', 'Тренажёрный зал', 'Тренажерный зал',
        'Семейные номера', 'Прокат автомобилей', 'Камера хранения',
        'Детские ТВ-каналы', 'Круглосуточная стойка', 'Отопление',
        'Телевизор', 'Кухня', 'Стиральная машина', 'Завтрак',
        'Размещение с животными'
    ]
    for kw in amenity_keywords:
        if kw.lower() in text.lower():
            amenities.append(kw)
    hotel['amenities'] = amenities
    
    # Description sections: each block has blockHead (with title) + blockText (with content)
    descriptions = {}
    section_titles = [
        'Расположение и транспорт',
        'Номера и размещение', 
        'Питание и завтрак',
        'Инфраструктура и удобства',
        'Сервис и персонал',
        'Достопримечательности рядом'
    ]
    
    for block in soup.find_all(class_=re.compile(r'HotelDescription_block__')):
        block_head = block.find(class_=re.compile(r'HotelDescription_blockHead'))
        block_text = block.find(class_=re.compile(r'HotelDescription_blockText'))
        if block_head and block_text:
            title = block_head.get_text(strip=True)
            if title in section_titles:
                descriptions[title] = block_text.get_text(strip=True)
    hotel['descriptions'] = descriptions
    
    # Main description from the description section intro (before blocks)
    desc_title = soup.find('h2', class_=re.compile(r'HotelDescription_title'))
    if desc_title:
        # The intro text is between the h2 and the first block
        desc_container = desc_title.parent
        if desc_container:
            # Find direct text content before blocks
            intro = desc_container.find(class_=re.compile(r'RawText_formatting|HotelDescription_text'))
            if intro:
                hotel['mainDescription'] = intro.get_text(strip=True)
            else:
                # Fallback: get text between title and first block
                for sib in desc_title.find_next_siblings():
                    cls_str = ' '.join(sib.get('class', []))
                    if 'block__' in cls_str or 'blocks__' in cls_str:
                        break
                    t = sib.get_text(strip=True)
                    if t and len(t) > 20:
                        hotel['mainDescription'] = t
                        break
    
    # Review ratings by category from HotelReviews_scoreLine elements
    review_categories = {}
    for score_line in soup.find_all(class_=re.compile(r'HotelReviews_scoreLine__[A-Z]')):
        label_el = score_line.find(class_=re.compile(r'HotelReviews_scoreLine__label'))
        if label_el:
            label = label_el.get_text(strip=True)
            # Get the full text and extract the number part
            full_text = score_line.get_text(strip=True)
            num_text = full_text.replace(label, '').strip()
            match = re.search(r'(\d+[,.]?\d*)', num_text)
            if match and label:
                review_categories[label] = float(match.group(1).replace(',', '.'))
        else:
            # Fallback: parse "Label8,9" pattern from text
            line_text = score_line.get_text(strip=True)
            for cat in ['Питание', 'Номер', 'Wi-Fi', 'Цена', 'Гигиена', 
                        'Расположение', 'Услуги', 'Чистота']:
                if cat in line_text:
                    num_text = line_text.replace(cat, '').strip()
                    match = re.search(r'(\d+[,.]?\d*)', num_text)
                    if match:
                        review_categories[cat] = float(match.group(1).replace(',', '.'))
    hotel['reviewRatings'] = review_categories
    
    # Images: extract from HTML (worldota CDN + tripadvisor photos)
    images = []
    img_urls = re.findall(r'(https?://(?:cdn\.worldota\.net|media-cdn\.tripadvisor\.com)/[^\x22\x27\\]+\.(?:jpg|jpeg|png|webp))', html)
    for src in img_urls:
        if src not in images:
            images.append(src)
    hotel['images'] = images[:20]
    
    # Price
    price_match = re.search(r'от\s*([\d\s,.]+)\s*₽', text.replace('\xa0', ' '))
    if price_match:
        price_str = price_match.group(1).replace(' ', '').replace(',', '.').strip()
        try:
            hotel['priceFrom'] = int(float(price_str))
        except ValueError:
            pass
    
    # Stars (hotel category)
    stars_match = re.search(r'(\d)\s*\*|категории?\s*(\d)|(\d)\s*звёзд', text)
    if stars_match:
        hotel['stars'] = int(stars_match.group(1) or stars_match.group(2) or stars_match.group(3))
    else:
        # Try to detect from main description 
        stars_re = re.search(r'(\d)\*', text)
        if stars_re:
            hotel['stars'] = int(stars_re.group(1))
    
    # Check-in/out time
    checkin_match = re.search(r'[Зз]аезд\s*(?:—|–|:|-)\s*(?:после\s+)?(\d{1,2}:\d{2})', text)
    if checkin_match:
        hotel['checkIn'] = checkin_match.group(1)
    checkout_match = re.search(r'[Вв]ыезд\s*(?:—|–|:|-)\s*(?:до\s+)?(\d{1,2}:\d{2})', text)
    if checkout_match:
        hotel['checkOut'] = checkout_match.group(1)
    
    return hotel


def main():
    print("=== Getting hotel URLs ===")
    urls = get_hotel_urls()
    print(f"Found {len(urls)} hotel URLs")
    for i, u in enumerate(urls):
        print(f"  {i+1}. {u}")
    
    print("\n=== Parsing hotel details ===")
    hotels = []
    for i, url in enumerate(urls):
        print(f"\n[{i+1}/{len(urls)}] Parsing...")
        try:
            hotel = parse_hotel_detail(url)
            hotels.append(hotel)
            name = hotel.get('name', 'Unknown')
            rating = hotel.get('rating', '?')
            imgs = len(hotel.get('images', []))
            descs = len(hotel.get('descriptions', {}))
            cats = len(hotel.get('reviewRatings', {}))
            print(f"  ✓ {name} - rating: {rating}, imgs: {imgs}, descriptions: {descs}, review cats: {cats}")
        except Exception as e:
            print(f"  ✗ Error: {e}")
        time.sleep(1)  # Be polite
    
    # Save results
    with open('hotels_parsed.json', 'w', encoding='utf-8') as f:
        json.dump(hotels, f, ensure_ascii=False, indent=2)
    
    print(f"\n=== Done! Parsed {len(hotels)} hotels ===")
    print("Results saved to hotels_parsed.json")


if __name__ == '__main__':
    main()
