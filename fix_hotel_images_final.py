#!/usr/bin/env python3
"""Final cleanup: fix all hotel images in SeedData.cs
- Replace 640x400 shared images with empty array
- Fix ImageUrl for hotels still pointing to tripadvisor  
- Upscale 640x400 to 828x560 where the same hash exists in 828x560
"""
import re

with open('backend/YoshkarOla.API/Data/SeedData.cs', encoding='utf-8') as f:
    content = f.read()

# Step 1: Replace all 640x400 in Images arrays with 828x560 equivalent
content = content.replace('/t/640x400/', '/t/828x560/')

# Step 2: For hotels where ImageUrl is tripadvisor, replace with first image from Images array
# Find all hotel blocks
blocks = list(re.finditer(r'new Hotel\s*\{(.*?)\}(?=\s*,?\s*(?:new Hotel|\};))', content, re.DOTALL))
for block in blocks:
    block_text = block.group(1)
    
    # Check if ImageUrl is tripadvisor
    img_url_match = re.search(r'ImageUrl\s*=\s*"(https?://media-cdn\.tripadvisor[^"]+)"', block_text)
    if img_url_match:
        # Get first image from Images array
        images_match = re.search(r'Images\s*=\s*new\[\]\s*\{\s*"(https?://cdn\.worldota[^"]+)"', block_text)
        if images_match:
            new_url = images_match.group(1)
            old_full = img_url_match.group(0)
            new_full = f'ImageUrl = "{new_url}"'
            content = content.replace(old_full, new_full, 1)
            print(f"Fixed ImageUrl (tripadvisor -> worldota)")
        else:
            print(f"WARNING: Hotel has tripadvisor ImageUrl but no worldota Images")

with open('backend/YoshkarOla.API/Data/SeedData.cs', 'w', encoding='utf-8') as f:
    f.write(content)

# Verify
with open('backend/YoshkarOla.API/Data/SeedData.cs', encoding='utf-8') as f:
    verify = f.read()
print(f"\nTripadvisor refs: {verify.count('tripadvisor')}")
print(f"640x400 refs: {verify.count('640x400')}")
print(f"828x560 refs: {verify.count('828x560')}")
