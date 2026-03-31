import urllib.request, re

url = 'https://visit-mariel.ru/living/hotels/otel-people-town/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req, timeout=10).read().decode('utf-8', errors='ignore')

# Write first 5000 chars to see page structure
with open('/Users/andreyselemetev/projects/yola_test/hotel_html_sample.txt', 'w') as f:
    # Find the slider/carousel area
    idx = html.find('people')
    if idx == -1:
        idx = html.find('People')
    if idx == -1:
        idx = html.find('PEOPLE')
    start = max(0, idx - 2000)
    f.write(html[start:start+5000])

# Also find data-src or data-lazy patterns
datasrc = re.findall(r'data-(?:src|lazy|background)[=:]["\']([^"\']+)["\']', html)
for d in datasrc[:20]:
    print(f'data-src: {d}')

# Find srcset patterns
srcsets = re.findall(r'srcset="([^"]+)"', html)
for s in srcsets[:10]:
    print(f'srcset: {s[:200]}')
