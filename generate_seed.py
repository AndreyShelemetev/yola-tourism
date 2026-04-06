#!/usr/bin/env python3
"""Generate C# SeedData code from hotels_parsed.json"""
import json

with open('hotels_parsed.json') as f:
    hotels = json.load(f)

def escape_cs(s):
    """Escape string for C# string literal"""
    if not s:
        return ""
    return s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n').replace('\r', '')

def format_string_array(arr):
    """Format a Python list as C# string array initializer"""
    if not arr:
        return 'Array.Empty<string>()'
    items = ', '.join(f'"{escape_cs(s)}"' for s in arr)
    return f'new[] {{ {items} }}'

print('    private static void SeedHotelsFromParsed(AppDbContext db)')
print('    {')
print('        db.Hotels.AddRange(')

for i, h in enumerate(hotels):
    name = escape_cs(h.get('name', ''))
    desc = escape_cs(h.get('mainDescription', ''))
    short_desc = escape_cs(desc[:150] + '...' if len(desc) > 150 else desc)
    addr = escape_cs(h.get('address', 'Йошкар-Ола'))
    rating = h.get('rating', 0)
    review_count = h.get('reviewCount', 0)
    price = h.get('priceFrom', 0)
    stars = h.get('stars', 0)
    images = h.get('images', [])
    amenities = h.get('amenities', [])
    descs = h.get('descriptions', {})
    ratings = h.get('reviewRatings', {})
    check_in = h.get('checkIn', '')
    check_out = h.get('checkOut', '')
    
    # First image as main ImageUrl
    image_url = images[0] if images else ''
    
    # Boolean flags from amenities
    has_wifi = 'Wi-Fi' in amenities
    has_parking = 'Парковка' in amenities
    has_pool = 'Бассейн' in amenities
    has_restaurant = 'Ресторан' in amenities
    
    comma = ',' if i < len(hotels) - 1 else ''
    
    print(f'            new Hotel')
    print(f'            {{')
    print(f'                Name = "{name}",')
    print(f'                Description = "{desc}",')
    print(f'                ShortDescription = "{short_desc}",')
    print(f'                Address = "{addr}",')
    print(f'                Latitude = 56.63,')
    print(f'                Longitude = 47.89,')
    print(f'                ImageUrl = "{escape_cs(image_url)}",')
    print(f'                Stars = {stars},')
    print(f'                Rating = {rating},')
    print(f'                ReviewCount = {review_count},')
    print(f'                PriceFrom = {price},')
    print(f'                Phone = "",')
    print(f'                Website = "",')
    print(f'                HasWifi = {str(has_wifi).lower()},')
    print(f'                HasParking = {str(has_parking).lower()},')
    print(f'                HasPool = {str(has_pool).lower()},')
    print(f'                HasRestaurant = {str(has_restaurant).lower()},')
    print(f'                Images = {format_string_array(images)},')
    print(f'                Amenities = {format_string_array(amenities)},')
    print(f'                CheckIn = "{escape_cs(check_in or "")}",')
    print(f'                CheckOut = "{escape_cs(check_out or "")}",')
    print(f'                DescriptionLocation = "{escape_cs(descs.get("Расположение и транспорт", ""))}",')
    print(f'                DescriptionRooms = "{escape_cs(descs.get("Номера и размещение", ""))}",')
    print(f'                DescriptionFood = "{escape_cs(descs.get("Питание и завтрак", ""))}",')
    print(f'                DescriptionInfrastructure = "{escape_cs(descs.get("Инфраструктура и удобства", ""))}",')
    print(f'                DescriptionService = "{escape_cs(descs.get("Сервис и персонал", ""))}",')
    print(f'                DescriptionAttractions = "{escape_cs(descs.get("Достопримечательности рядом", ""))}",')
    print(f'                RatingFood = {ratings.get("Питание", 0)},')
    print(f'                RatingRoom = {ratings.get("Номер", 0)},')
    print(f'                RatingWifi = {ratings.get("Wi-Fi", 0)},')
    print(f'                RatingPrice = {ratings.get("Цена", 0)},')
    print(f'                RatingHygiene = {ratings.get("Гигиена", 0)},')
    print(f'                RatingLocation = {ratings.get("Расположение", 0)},')
    print(f'                RatingService = {ratings.get("Услуги", 0)},')
    print(f'                RatingCleanliness = {ratings.get("Чистота", 0)}')
    print(f'            }}{comma}')

print('        );')
print('    }')
