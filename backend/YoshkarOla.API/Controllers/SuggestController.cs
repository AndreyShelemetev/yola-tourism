using Microsoft.AspNetCore.Mvc;
using YoshkarOla.API.Services;

namespace YoshkarOla.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SuggestController : ControllerBase
{
    private readonly MeiliSearchService _meili;

    public SuggestController(MeiliSearchService meili) => _meili = meili;

    [HttpGet]
    public async Task<ActionResult<List<SuggestionDoc>>> Get([FromQuery] string? q)
    {
        if (string.IsNullOrWhiteSpace(q) || q.Length < 1)
            return Ok(new List<SuggestionDoc>());

        var results = await _meili.SuggestAsync(q);
        return Ok(results);
    }
}
