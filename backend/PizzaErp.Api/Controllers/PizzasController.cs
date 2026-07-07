using System.Data.Common;
using Microsoft.AspNetCore.Mvc;
using PizzaErp.Api.Data;
using PizzaErp.Api.Models;

[ApiController]
[Route("api/pizzas")]
public class PizzasController : ControllerBase
{
  private readonly AppDbContext _db;
  public PizzasController(AppDbContext db) => _db = db;

  [HttpGet]
  public IActionResult Get() => Ok(_db.Pizzas.ToList());

  [HttpPost]
  public IActionResult Post(Pizza pizza)
  {
    _db.Pizzas.Add(pizza);
    _db.SaveChanges();
    return Ok(pizza);
  }
}