import urllib.request, re, json

url = 'https://visit-mariel.ru/living/?type=hotels&PAGEN_1=1'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')

# Find card patterns: hotel link followed by images
# Each hotel card should have a structure with link and nearby images
# Look for pattern: /living/hotels/SLUG/ near /upload/resize_cache/ images

# Find all positions of hotel links
hotel_positions = []
for m in re.finditer(r'href="(/living/hotels/([a-z0-9-]+)/)"', html):
    hotel_positions.append((m.start(), m.group(2), m.group(1)))

# Find all image positions
img_positions = []
for m in re.finditer(r'(/upload/resize_cache/iblock/[a-z0-9]+/463_370_[a-z0-9]+/[a-z0-9]+\.(?:jpg|webp))', html):
    img_positions.append((m.start(), m.group(1)))
    
# If no 463_370, try 520_332
if not img_positions:
    for m in re.finditer(r'(/upload/resize_cache/iblock/[a-z0-9]+/520_332_[a-z0-9]+/[a-z0-9]+\.(?:jpg|webp))', html):
        img_positions.append((m.start(), m.group(1)))

# For each hotel, find the closest image BEFORE it
results = {}
for pos, slug, path in hotel_positions:
    if slug in results:
        continue
    # Find closest image before this hotel link
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

for slug, img in results.items():
    print(f'{slug}: {img}')
