#!/usr/bin/env python3
"""Clean up SeedData.cs to remove tripadvisor and 640x400 images, keep only 828x560 extranet worldota"""
import re

with open('backend/YoshkarOla.API/Data/SeedData.cs', encoding='utf-8') as f:
    content = f.read()

def clean_images(match):
    old_array = match.group(0)
    urls = re.findall(r'"(https?://[^"]+)"', old_array)
    clean = [u for u in urls if 'cdn.worldota.net/t/828x560/extranet/' in u]
    if not clean:
        clean = [u for u in urls if 'cdn.worldota.net' in u and 'extranet/' in u][:5]
    if not clean:
        return old_array
    imgs_str = ', '.join(f'"{u}"' for u in clean[:10])
    return f'Images = new[] {{ {imgs_str} }}'

new_content = re.sub(r'Images\s*=\s*new\[\]\s*\{[^}]+\}', clean_images, content)

with open('backend/YoshkarOla.API/Data/SeedData.cs', 'w', encoding='utf-8') as f:
    f.write(new_content)

with open('backend/YoshkarOla.API/Data/SeedData.cs', encoding='utf-8') as f:
    verify = f.read()
print(f"Tripadvisor refs remaining: {verify.count('tripadvisor')}")
print(f"640x400 refs remaining: {verify.count('640x400')}")
print(f"828x560 refs: {verify.count('828x560')}")
