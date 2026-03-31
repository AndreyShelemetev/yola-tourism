namespace YoshkarOla.API.DTOs;

public record EventDto(
    int Id,
    string Title,
    string ShortDescription,
    string Location,
    string Address,
    DateTime StartDate,
    DateTime? EndDate,
    string ImageUrl,
    string Category,
    bool IsFree,
    int? Price
);
