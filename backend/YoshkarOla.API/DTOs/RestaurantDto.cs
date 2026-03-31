namespace YoshkarOla.API.DTOs;

public record RestaurantDto(
    int Id,
    string Name,
    string ShortDescription,
    string Address,
    double Latitude,
    double Longitude,
    string ImageUrl,
    string Cuisine,
    string PriceRange,
    double Rating,
    bool HasDelivery
);

public record RestaurantDetailDto(
    int Id,
    string Name,
    string Description,
    string ShortDescription,
    string Address,
    double Latitude,
    double Longitude,
    string ImageUrl,
    string Cuisine,
    string PriceRange,
    double Rating,
    string Phone,
    string WorkingHours,
    bool HasDelivery
);
