import urllib.request, re, json

results = {}
for page in [1, 2, 3, 4]:
    url = f'https://visit-mariel.ru/living/?type=hotels&PAGEN_1={page}'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
    
    # Find hotel links and their nearby images
    # Pattern: look for hotel slug links with nearby image paths
    sections = re.findall(r'(/living/hotels/([a-z0-9-]+)/)', html)
    seen_slugs = set()
    for full_path, slug in sections:
        if slug not in seen_slugs:
            seen_slugs.add(slug)
    
    # Find unique images per iblock folder - these should be hotel-specific
    all_imgs = re.findall(r'/upload/resize_cache/iblock/([a-z0-9]+)/(\d+_\d+)_([a-z0-9]+)/([a-z0-9]+)\.(jpg|webp)', html)
    
    # Group by iblock folder
    by_folder = {}
    for folder, size, hashv, fname, ext in all_imgs:
        key = f'{folder}/{fname}'
        if key not in by_folder:
            by_folder[key] = {
                'folder': folder,
                'fname': fname,
                'sizes': set(),
                'hashv': hashv
            }
        by_folder[key]['sizes'].add(size)
    
    # Print unique images with 463x370 size (card format on listing)
    for key, info in by_folder.items():
        if '463_370' in info['sizes'] or '520_332' in info['sizes']:
            best = '463_370' if '463_370' in info['sizes'] else '520_332'
            img_url = f"https://visit-mariel.ru/upload/resize_cache/iblock/{info['folder']}/{best}_{info['hashv']}/{info['fname']}.jpg"
            print(f"PAGE{page}|{info['folder']}|{img_url}")

print("---SLUGS---")
for page in [1, 2]:
    url = f'https://visit-mariel.ru/living/?type=hotels&PAGEN_1={page}'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
    slugs = re.findall(r'/living/hotels/([a-z0-9-]+)/', html)
    # Unique ordered
    seen = []
    for s in slugs:
        if s not in seen:
            seen.append(s)
    for s in seen:
        print(f'PAGE{page}|{s}')
