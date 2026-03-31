using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YoshkarOla.API.Data;
using YoshkarOla.API.DTOs;

namespace YoshkarOla.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AttractionsController : ControllerBase
{
    private readonly AppDbContext _db;

    public AttractionsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<PagedResult<AttractionDto>>> GetAll(
        [FromQuery] string? category,
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 12)
    {
        var query = _db.Attractions.AsQueryable();

        if (!string.IsNullOrEmpty(category))
            query = query.Where(a => a.Category == category);

        if (!string.IsNullOrEmpty(search))
        {
            var term = search.ToLower();
            query = query.Where(a =>
                a.Name.ToLower().Contains(term) ||
                a.ShortDescription.ToLower().Contains(term) ||
                a.Address.ToLower().Contains(term) ||
                a.Category.ToLower().Contains(term));
        }

        var totalCount = await query.CountAsync();
        var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

        var items = await query
            .OrderByDescending(a => a.Rating)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(a => new AttractionDto(
                a.Id, a.Name, a.ShortDescription, a.Address,
                a.Latitude, a.Longitude, a.ImageUrl,
                a.Category, a.Rating, a.IsFree))
            .ToListAsync();

        return Ok(new PagedResult<AttractionDto>(items, totalCount, page, pageSize, totalPages));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AttractionDetailDto>> GetById(int id)
    {
        var a = await _db.Attractions.FindAsync(id);
        if (a is null) return NotFound();

        return Ok(new AttractionDetailDto(
            a.Id, a.Name, a.Description, a.ShortDescription, a.Address,
            a.Latitude, a.Longitude, a.ImageUrl,
            a.Category, a.Rating, a.WorkingHours, a.IsFree));
    }

    [HttpGet("categories")]
    public async Task<ActionResult<List<string>>> GetCategories()
    {
        var categories = await _db.Attractions
            .Select(a => a.Category)
            .Distinct()
            .OrderBy(c => c)
            .ToListAsync();

        return Ok(categories);
    }
}
