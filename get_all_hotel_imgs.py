import urllib.request, re, json

results = {}
for page in [1, 2, 3, 4]:
    url = f'https://visit-mariel.ru/living/?type=hotels&PAGEN_1={page}'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')

    hotel_positions = []
    for m in re.finditer(r'href="(/living/hotels/([a-z0-9-]+)/)"', html):
        hotel_positions.append((m.start(), m.group(2)))

    img_positions = []
    for m in re.finditer(r'(/upload/resize_cache/iblock/[a-z0-9]+/520_332_[a-z0-9]+/[a-z0-9]+\.(?:jpg|webp))', html):
        img_positions.append((m.start(), m.group(1)))

    for pos, slug in hotel_positions:
        if slug in results:
            continue
        closest_img = None
        closest_dist = float('inf')
        for ipos, ipath in img_positions:
            dist = pos - ipos
            if 0 < dist < closest_dist:
                closest_dist = dist
                closest_img = ipath
        if closest_img:
            results[slug] = f'https://visit-mariel.ru{closest_img}'

with open('/Users/andreyselemetev/projects/yola_test/hotel_images.json', 'w') as f:
    json.dump(results, f, indent=2)
print(f'Found {len(results)} hotels with images')
for slug, img in results.items():
    print(f'{slug}')
