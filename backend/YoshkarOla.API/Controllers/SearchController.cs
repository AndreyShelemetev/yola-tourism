using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YoshkarOla.API.Data;
using YoshkarOla.API.DTOs;

namespace YoshkarOla.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SearchController : ControllerBase
{
    private readonly AppDbContext _db;

    public SearchController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<SearchResultDto>> Search([FromQuery] string? q)
    {
        if (string.IsNullOrWhiteSpace(q))
            return Ok(new SearchResultDto([], [], [], []));

        var term = q.ToLower();

        var attractions = await _db.Attractions
            .Where(a =>
                a.Name.ToLower().Contains(term) ||
                a.ShortDescription.ToLower().Contains(term) ||
                a.Address.ToLower().Contains(term) ||
                a.Category.ToLower().Contains(term))
            .OrderByDescending(a => a.Rating)
            .Take(6)
            .Select(a => new AttractionDto(
                a.Id, a.Name, a.ShortDescription, a.Address,
                a.Latitude, a.Longitude, a.ImageUrl,
                a.Category, a.Rating, a.IsFree))
            .ToListAsync();

        var hotels = await _db.Hotels
            .Where(h =>
                h.Name.ToLower().Contains(term) ||
                h.ShortDescription.ToLower().Contains(term) ||
                h.Address.ToLower().Contains(term))
            .OrderByDescending(h => h.Rating)
            .Take(6)
            .Select(h => new HotelDto(
                h.Id, h.Name, h.ShortDescription, h.Address,
                h.Latitude, h.Longitude,
                h.ImageUrl, h.Stars, h.Rating, h.PriceFrom,
                h.HasWifi, h.HasParking))
            .ToListAsync();

        var restaurants = await _db.Restaurants
            .Where(r =>
                r.Name.ToLower().Contains(term) ||
                r.ShortDescription.ToLower().Contains(term) ||
                r.Address.ToLower().Contains(term) ||
                r.Cuisine.ToLower().Contains(term))
            .OrderByDescending(r => r.Rating)
            .Take(6)
            .Select(r => new RestaurantDto(
                r.Id, r.Name, r.ShortDescription, r.Address,
                r.Latitude, r.Longitude,
                r.ImageUrl, r.Cuisine, r.PriceRange,
                r.Rating, r.HasDelivery))
            .ToListAsync();

        var events = await _db.Events
            .Where(e =>
                e.Title.ToLower().Contains(term) ||
                e.ShortDescription.ToLower().Contains(term) ||
                e.Location.ToLower().Contains(term) ||
                e.Address.ToLower().Contains(term))
            .OrderBy(e => e.StartDate)
            .Take(6)
            .Select(e => new EventDto(
                e.Id, e.Title, e.ShortDescription, e.Location,
                e.Address, e.StartDate, e.EndDate, e.ImageUrl,
                e.Category, e.IsFree, e.Price))
            .ToListAsync();

        return Ok(new SearchResultDto(attractions, hotels, restaurants, events));
    }
}

public record SearchResultDto(
    List<AttractionDto> Attractions,
    List<HotelDto> Hotels,
    List<RestaurantDto> Restaurants,
    List<EventDto> Events
);
