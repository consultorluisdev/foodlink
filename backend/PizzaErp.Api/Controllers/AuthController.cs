using Microsoft.AspNetCore.Mvc;
using PizzaErp.Api.Data;


[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
  private readonly AppDbContext _db;
  public AuthController(AppDbContext db) => _db = db;

}