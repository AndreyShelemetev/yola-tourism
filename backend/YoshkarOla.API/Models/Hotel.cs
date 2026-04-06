namespace YoshkarOla.API.Models;

public class Hotel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ShortDescription { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public int Stars { get; set; }
    public double Rating { get; set; }
    public int PriceFrom { get; set; }
    public string Phone { get; set; } = string.Empty;
    public string Website { get; set; } = string.Empty;
    public bool HasWifi { get; set; }
    public bool HasParking { get; set; }
    public bool HasPool { get; set; }
    public bool HasRestaurant { get; set; }

    // New fields from gdeotel.ru parsing
    public string[] Images { get; set; } = Array.Empty<string>();
    public string[] Amenities { get; set; } = Array.Empty<string>();
    public int ReviewCount { get; set; }
    public string CheckIn { get; set; } = string.Empty;
    public string CheckOut { get; set; } = string.Empty;

    // Description sections
    public string DescriptionLocation { get; set; } = string.Empty;
    public string DescriptionRooms { get; set; } = string.Empty;
    public string DescriptionFood { get; set; } = string.Empty;
    public string DescriptionInfrastructure { get; set; } = string.Empty;
    public string DescriptionService { get; set; } = string.Empty;
    public string DescriptionAttractions { get; set; } = string.Empty;

    // Review category ratings (0-10 scale)
    public double RatingFood { get; set; }
    public double RatingRoom { get; set; }
    public double RatingWifi { get; set; }
    public double RatingPrice { get; set; }
    public double RatingHygiene { get; set; }
    public double RatingLocation { get; set; }
    public double RatingService { get; set; }
    public double RatingCleanliness { get; set; }
}
