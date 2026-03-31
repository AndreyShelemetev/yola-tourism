using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YoshkarOla.API.Data;
using YoshkarOla.API.DTOs;

namespace YoshkarOla.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RestaurantsController : ControllerBase
{
    private readonly AppDbContext _db;

    public RestaurantsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<PagedResult<RestaurantDto>>> GetAll(
        [FromQuery] string? cuisine,
        [FromQuery] string? priceRange,
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 12)
    {
        var query = _db.Restaurants.AsQueryable();

        if (!string.IsNullOrEmpty(cuisine))
            query = query.Where(r => r.Cuisine == cuisine);
        if (!string.IsNullOrEmpty(priceRange))
            query = query.Where(r => r.PriceRange == priceRange);

        if (!string.IsNullOrEmpty(search))
        {
            var term = search.ToLower();
            query = query.Where(r =>
                r.Name.ToLower().Contains(term) ||
                r.ShortDescription.ToLower().Contains(term) ||
                r.Address.ToLower().Contains(term) ||
                r.Cuisine.ToLower().Contains(term));
        }

        var totalCount = await query.CountAsync();
        var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

        var items = await query
            .OrderByDescending(r => r.Rating)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(r => new RestaurantDto(
                r.Id, r.Name, r.ShortDescription, r.Address,
                r.Latitude, r.Longitude,
                r.ImageUrl, r.Cuisine, r.PriceRange,
                r.Rating, r.HasDelivery))
            .ToListAsync();

        return Ok(new PagedResult<RestaurantDto>(items, totalCount, page, pageSize, totalPages));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<RestaurantDetailDto>> GetById(int id)
    {
        var r = await _db.Restaurants.FindAsync(id);
        if (r is null) return NotFound();

        return Ok(new RestaurantDetailDto(
            r.Id, r.Name, r.Description, r.ShortDescription, r.Address,
            r.Latitude, r.Longitude, r.ImageUrl,
            r.Cuisine, r.PriceRange, r.Rating,
            r.Phone, r.WorkingHours, r.HasDelivery));
    }

    [HttpGet("cuisines")]
    public async Task<ActionResult<List<string>>> GetCuisines()
    {
        var cuisines = await _db.Restaurants
            .Select(r => r.Cuisine)
            .Distinct()
            .OrderBy(c => c)
            .ToListAsync();

        return Ok(cuisines);
    }
}
