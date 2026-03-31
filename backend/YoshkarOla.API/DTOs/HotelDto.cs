namespace YoshkarOla.API.DTOs;

public record HotelDto(
    int Id,
    string Name,
    string ShortDescription,
    string Address,
    double Latitude,
    double Longitude,
    string ImageUrl,
    int Stars,
    double Rating,
    int PriceFrom,
    bool HasWifi,
    bool HasParking
);

public record HotelDetailDto(
    int Id,
    string Name,
    string Description,
    string ShortDescription,
    string Address,
    double Latitude,
    double Longitude,
    string ImageUrl,
    int Stars,
    double Rating,
    int PriceFrom,
    string Phone,
    string Website,
    bool HasWifi,
    bool HasParking,
    bool HasPool,
    bool HasRestaurant
);
