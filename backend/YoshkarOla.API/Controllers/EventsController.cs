using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YoshkarOla.API.Data;
using YoshkarOla.API.DTOs;

namespace YoshkarOla.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly AppDbContext _db;

    public EventsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<PagedResult<EventDto>>> GetAll(
        [FromQuery] string? category,
        [FromQuery] bool? upcoming,
        [FromQuery] string? search,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 12)
    {
        var query = _db.Events.AsQueryable();

        if (!string.IsNullOrEmpty(category))
            query = query.Where(e => e.Category == category);
        if (upcoming == true)
            query = query.Where(e => e.StartDate >= DateTime.UtcNow);

        if (!string.IsNullOrEmpty(search))
        {
            var term = search.ToLower();
            query = query.Where(e =>
                e.Title.ToLower().Contains(term) ||
                e.ShortDescription.ToLower().Contains(term) ||
                e.Location.ToLower().Contains(term) ||
                e.Address.ToLower().Contains(term));
        }

        var totalCount = await query.CountAsync();
        var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

        var items = await query
            .OrderBy(e => e.StartDate)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(e => new EventDto(
                e.Id, e.Title, e.ShortDescription, e.Location,
                e.Address, e.StartDate, e.EndDate, e.ImageUrl,
                e.Category, e.IsFree, e.Price))
            .ToListAsync();

        return Ok(new PagedResult<EventDto>(items, totalCount, page, pageSize, totalPages));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<EventDto>> GetById(int id)
    {
        var e = await _db.Events.FindAsync(id);
        if (e is null) return NotFound();

        return Ok(new EventDto(
            e.Id, e.Title, e.ShortDescription, e.Location,
            e.Address, e.StartDate, e.EndDate, e.ImageUrl,
            e.Category, e.IsFree, e.Price));
    }
}
