import urllib.request, re, json

hotels = [
    ('otel-people-town', 'People Town'),
    ('otel-rubiton-4', 'Rubiton'),
    ('azimut-otel-yoshkar-ola-4', 'Azimut'),
    ('otel-nikitin', 'Nikitin'),
    ('amaks-siti-otel-', 'AMAKS'),
    ('otel-vernisazh-', 'Vernisazh'),
    ('otel-2020-3-yoshkar-ola', 'Otel2020'),
    ('otel-rgard', 'RGard'),
    ('otel-onar', 'Onar'),
    ('butik-otel-stone', 'Stone'),
    ('gostinitsa-pervyy-poezd', 'PervyyPoezd'),
    ('gostinitsa-virdzhiniya', 'Virdzhiniya'),
    ('gostinichnyy-kompleks-korona', 'Korona'),
    ('otel-revizor', 'Revizor'),
    ('gostinitsa-zamok-sheremeteva', 'Sheremetev'),
]

SKIP = 'l3fhz4tsbq1w0nr8bu0hcqobqerdr2m1'

results = {}
for slug, name in hotels:
    url = f'https://visit-mariel.ru/living/hotels/{slug}/'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')
        imgs = re.findall(r'/upload/resize_cache/iblock/([a-z0-9]+)/520_332_([a-z0-9]+)/([a-z0-9]+)\.(?:jpg|webp)', html)
        found = False
        for folder, hashv, fname in imgs:
            if SKIP not in fname:
                full = f'https://visit-mariel.ru/upload/resize_cache/iblock/{folder}/520_332_{hashv}/{fname}.jpg'
                results[name] = full
                found = True
                break
        if not found:
            imgs2 = re.findall(r'/upload/resize_cache/iblock/([a-z0-9]+)/(\d+_\d+_[a-z0-9]+)/([a-z0-9]+)\.(?:jpg|webp)', html)
            for folder, sizehash, fname in imgs2:
                if SKIP not in fname:
                    full = f'https://visit-mariel.ru/upload/resize_cache/iblock/{folder}/{sizehash}/{fname}.jpg'
                    results[name] = full
                    found = True
                    break
        if not found:
            results[name] = 'NOT_FOUND'
    except Exception as e:
        results[name] = f'ERROR: {e}'

with open('/Users/andreyselemetev/projects/yola_test/hotel_images.json', 'w') as f:
    json.dump(results, f, indent=2)
print('Done')
