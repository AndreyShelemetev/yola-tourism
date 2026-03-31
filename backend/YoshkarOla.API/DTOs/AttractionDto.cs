namespace YoshkarOla.API.DTOs;

public record AttractionDto(
    int Id,
    string Name,
    string ShortDescription,
    string Address,
    double Latitude,
    double Longitude,
    string ImageUrl,
    string Category,
    double Rating,
    bool IsFree
);

public record AttractionDetailDto(
    int Id,
    string Name,
    string Description,
    string ShortDescription,
    string Address,
    double Latitude,
    double Longitude,
    string ImageUrl,
    string Category,
    double Rating,
    string WorkingHours,
    bool IsFree
);
