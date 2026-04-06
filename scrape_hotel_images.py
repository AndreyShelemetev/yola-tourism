#!/usr/bin/env python3
"""Scrape hotel-specific images from gdeotel.ru (only worldota 828x560 extranet)"""
import requests
import re
import json
import time
from bs4 import BeautifulSoup

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

LISTING_URL = 'https://gdeotel.ru/%D0%BE%D1%82%D0%B5%D0%BB%D0%B8/%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D1%8F/%D0%9C%D0%B0%D1%80%D0%B8%D0%B9-%D0%AD%D0%BB/%D0%99%D0%BE%D1%88%D0%BA%D0%B0%D1%80-%D0%9E%D0%BB%D0%B0'


def get_hotel_urls():
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


def scrape_hotel_images(url):
    """Get only hotel-specific images (worldota 828x560 extranet)"""
    resp = requests.get(url, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, 'html.parser')

    # Get hotel name
    h1 = soup.find('h1')
    name = h1.get_text(strip=True).split(',')[0].strip() if h1 else 'Unknown'

    # Only worldota 828x560 extranet images — these are the hotel's own photos
    pattern = r'https://cdn\.worldota\.net/t/828x560/extranet/[a-f0-9/]+\.jpeg'
    all_imgs = re.findall(pattern, resp.text)

    # Deduplicate preserving order, by hash (last part of path)
    seen_hashes = set()
    unique = []
    for img in all_imgs:
        # Extract hash from URL like .../05/8f/058f3df37313f4126c8730ea21db18c9da0992eb.jpeg
        h = img.rsplit('/', 1)[-1]
        if h not in seen_hashes:
            seen_hashes.add(h)
            unique.append(img)

    return name, unique


def main():
    print("=== Getting hotel URLs ===")
    urls = get_hotel_urls()
    print(f"Found {len(urls)} hotels\n")

    results = {}
    for i, url in enumerate(urls):
        print(f"[{i+1}/{len(urls)}] ", end='')
        try:
            name, images = scrape_hotel_images(url)
            results[name] = images
            print(f"{name}: {len(images)} photos")
        except Exception as e:
            print(f"ERROR: {e}")
        time.sleep(0.5)

    with open('hotel_images_clean.json', 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f"\n=== Done! {len(results)} hotels ===")
    total = sum(len(v) for v in results.values())
    print(f"Total images: {total}")


if __name__ == '__main__':
    main()
