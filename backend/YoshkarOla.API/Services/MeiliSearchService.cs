using Meilisearch;
using Microsoft.EntityFrameworkCore;
using YoshkarOla.API.Data;

namespace YoshkarOla.API.Services;

public class MeiliSearchService
{
    private readonly MeilisearchClient _client;
    private const string IndexName = "suggestions";

    public MeiliSearchService(IConfiguration configuration)
    {
        var url = configuration["MeiliSearch:Url"] ?? "http://localhost:7700";
        _client = new MeilisearchClient(url);
    }

    public async Task IndexAllDataAsync(AppDbContext db)
    {
        var index = _client.Index(IndexName);

        await _client.CreateIndexAsync(IndexName, "id");
        await Task.Delay(500);

        await index.UpdateFilterableAttributesAsync(["type"]);
        await index.UpdateSearchableAttributesAsync(["title", "subtitle", "address"]);

        var documents = new List<SuggestionDoc>();

        var attractions = await db.Attractions.ToListAsync();
        foreach (var a in attractions)
        {
            documents.Add(new SuggestionDoc
            {
                Id = $"attraction_{a.Id}",
                EntityId = a.Id,
                Type = "attraction",
                Title = a.Name,
                Subtitle = a.Category,
                Address = a.Address,
                ImageUrl = a.ImageUrl,
                Rating = a.Rating,
            });
        }

        var hotels = await db.Hotels.ToListAsync();
        foreach (var h in hotels)
        {
            documents.Add(new SuggestionDoc
            {
                Id = $"hotel_{h.Id}",
                EntityId = h.Id,
                Type = "hotel",
                Title = h.Name,
                Subtitle = $"{h.Stars}★ · от {h.PriceFrom} ₽",
                Address = h.Address,
                ImageUrl = h.ImageUrl,
                Rating = h.Rating,
            });
        }

        var restaurants = await db.Restaurants.ToListAsync();
        foreach (var r in restaurants)
        {
            documents.Add(new SuggestionDoc
            {
                Id = $"restaurant_{r.Id}",
                EntityId = r.Id,
                Type = "restaurant",
                Title = r.Name,
                Subtitle = $"{r.Cuisine} · {r.PriceRange}",
                Address = r.Address,
                ImageUrl = r.ImageUrl,
                Rating = r.Rating,
            });
        }

        var events = await db.Events.ToListAsync();
        foreach (var e in events)
        {
            documents.Add(new SuggestionDoc
            {
                Id = $"event_{e.Id}",
                EntityId = e.Id,
                Type = "event",
                Title = e.Title,
                Subtitle = e.Location,
                Address = e.Address,
                ImageUrl = e.ImageUrl,
                Rating = 0,
            });
        }

        if (documents.Count > 0)
        {
            await index.AddDocumentsAsync(documents);
        }
    }

    public async Task<List<SuggestionDoc>> SuggestAsync(string query, int limit = 8)
    {
        var index = _client.Index(IndexName);
        var result = await index.SearchAsync<SuggestionDoc>(query, new SearchQuery
        {
            Limit = limit,
        });
        return result.Hits.ToList();
    }
}

public class SuggestionDoc
{
    public string Id { get; set; } = string.Empty;
    public int EntityId { get; set; }
    public string Type { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Subtitle { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public double Rating { get; set; }
}
