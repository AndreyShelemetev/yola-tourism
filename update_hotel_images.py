#!/usr/bin/env python3
"""Generate SeedData Images replacements from clean hotel images"""
import json
import re

MAX_IMAGES = 10  # max images per hotel for the gallery

with open('hotel_images_clean.json', encoding='utf-8') as f:
    data = json.load(f)

with open('backend/YoshkarOla.API/Data/SeedData.cs', encoding='utf-8') as f:
    seed = f.read()

for name, imgs in data.items():
    if not imgs:
        print(f"SKIP (no images): {name}")
        continue
    
    # Limit to MAX_IMAGES
    imgs = imgs[:MAX_IMAGES]
    
    # Find the existing Images = new[] { ... } line for this hotel
    # We need to find it after the Name = "name" line
    name_escaped = re.escape(name)
    # Find the block for this hotel
    pattern = rf'(Name\s*=\s*"{name_escaped}".*?)(Images\s*=\s*new\[\]\s*\{{[^}}]+\}})'
    match = re.search(pattern, seed, re.DOTALL)
    
    if match:
        old_images = match.group(2)
        new_images_str = ', '.join(f'"{img}"' for img in imgs)
        new_images = f'Images = new[] {{ {new_images_str} }}'
        seed = seed.replace(old_images, new_images, 1)
        print(f"OK: {name} -> {len(imgs)} images")
    else:
        print(f"NOT FOUND in SeedData: {name}")

# Also update ImageUrl to first image
for name, imgs in data.items():
    if not imgs:
        continue
    name_escaped = re.escape(name)
    pattern = rf'(Name\s*=\s*"{name_escaped}".*?)(ImageUrl\s*=\s*"[^"]+")'
    match = re.search(pattern, seed, re.DOTALL)
    if match:
        old_url = match.group(2)
        new_url = f'ImageUrl = "{imgs[0]}"'
        seed = seed.replace(old_url, new_url, 1)

with open('backend/YoshkarOla.API/Data/SeedData.cs', 'w', encoding='utf-8') as f:
    f.write(seed)

print("\nDone! SeedData.cs updated.")
