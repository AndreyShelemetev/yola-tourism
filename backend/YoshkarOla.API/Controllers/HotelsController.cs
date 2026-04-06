using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YoshkarOla.API.Data;
using YoshkarOla.API.DTOs;

namespace YoshkarOla.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HotelsController : ControllerBase
{
    private readonly AppDbContext _db;

    public HotelsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<PagedResult<HotelDto>>> GetAll(
        [FromQuery] int? minStars,
        [FromQuery] int? maxPrice,
        [FromQuery] string? city,
        [FromQuery] double? minRating,
        [FromQuery] string? sort,
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 12)
    {
        var query = _db.Hotels.AsQueryable();

        if (minStars.HasValue)
            query = query.Where(h => h.Stars >= minStars.Value);
        if (maxPrice.HasValue)
            query = query.Where(h => h.PriceFrom <= maxPrice.Value);
        if (minRating.HasValue)
            query = query.Where(h => h.Rating >= minRating.Value);
        if (!string.IsNullOrEmpty(city))
        {
            var cterm = city.ToLower();
            query = query.Where(h => h.Address.ToLower().Contains(cterm));
        }

        if (!string.IsNullOrEmpty(search))
        {
            var term = search.ToLower();
            query = query.Where(h =>
                h.Name.ToLower().Contains(term) ||
                h.ShortDescription.ToLower().Contains(term) ||
                h.Address.ToLower().Contains(term));
        }

        query = sort switch
        {
            "price" => query.OrderBy(h => h.PriceFrom),
            "price_desc" => query.OrderByDescending(h => h.PriceFrom),
            "stars" => query.OrderByDescending(h => h.Stars),
            _ => query.OrderByDescending(h => h.Rating)
        };

        var totalCount = await query.CountAsync();
        var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(h => new HotelDto(
                h.Id, h.Name, h.ShortDescription, h.Address,
                h.Latitude, h.Longitude,
                h.ImageUrl, h.Stars, h.Rating, h.ReviewCount, h.PriceFrom,
                h.HasWifi, h.HasParking, h.Amenities))
            .ToListAsync();

        return Ok(new PagedResult<HotelDto>(items, totalCount, page, pageSize, totalPages));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<HotelDetailDto>> GetById(int id)
    {
        var h = await _db.Hotels.FindAsync(id);
        if (h is null) return NotFound();

        return Ok(new HotelDetailDto(
            h.Id, h.Name, h.Description, h.ShortDescription, h.Address,
            h.Latitude, h.Longitude, h.ImageUrl, h.Images,
            h.Stars, h.Rating, h.ReviewCount, h.PriceFrom,
            h.Phone, h.Website, h.HasWifi, h.HasParking, h.HasPool, h.HasRestaurant,
            h.Amenities, h.CheckIn, h.CheckOut,
            h.DescriptionLocation, h.DescriptionRooms, h.DescriptionFood,
            h.DescriptionInfrastructure, h.DescriptionService, h.DescriptionAttractions,
            h.RatingFood, h.RatingRoom, h.RatingWifi, h.RatingPrice,
            h.RatingHygiene, h.RatingLocation, h.RatingService, h.RatingCleanliness));
    }

    [HttpGet("stars")]
    public async Task<ActionResult<int[]>> GetDistinctStars()
    {
        var stars = await _db.Hotels
            .Select(h => h.Stars)
            .Distinct()
            .OrderByDescending(s => s)
            .ToArrayAsync();
        return Ok(stars);
    }
}
