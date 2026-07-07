using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace PizzaErp.Api.Services;

public class OpenRouterService
{
  private readonly HttpClient _http;
  private readonly IConfiguration _config;

  public OpenRouterService(HttpClient http, IConfiguration config)
  {
    _http = http;
    _config = config;
  }
  public async Task<String> PerguntarAsync(string pergunta)
  {
    var apiKey = _config["OpenRouter:ApiKey"];
    var model = _config["OpenRouter:Model"];

    var body = new
    {
      model,
      messages = new[]
      {
        new { role = "system", content = "Você é um consultor especialista em gestão empresarial de pizzarias."},
        new { role = "user", content = pergunta}
      }
    };

    var json = JsonSerializer.Serialize(body);

    _http.DefaultRequestHeaders.Clear();
    _http.DefaultRequestHeaders.Authorization = 
    new AuthenticationHeaderValue("Bearer", apiKey);
    _http.DefaultRequestHeaders.Add("HTTP-Referer", "http://localhost");
    _http.DefaultRequestHeaders.Add("X-Title", "PizzaERP");

    var response = await _http.PostAsync(
      "https://openrouter.ai/api/v1/chat/completions",
      new StringContent(json, Encoding.UTF8, "application/json")
    );

    var result = await response.Content.ReadAsStringAsync();

    using var doc = JsonDocument.Parse(result);
    return doc.RootElement
    .GetProperty("choices")[0]
    .GetProperty("message")
    .GetProperty("content")
    .GetString() ?? "";
  }
}