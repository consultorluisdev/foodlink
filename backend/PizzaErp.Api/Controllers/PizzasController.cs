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
  public IActionResult Get() => Ok(_db.Pizzas.Where(p => !p.IsDeleted).ToList());

  [HttpGet("{id}")]
  public IActionResult GetById(int id)
  {
    var pizza = _db.Pizzas.Find(id);
    if (pizza == null) return NotFound();
    return Ok(pizza);
  }

  [HttpPost]
  public IActionResult Post(Pizza pizza)
  {
    _db.Pizzas.Add(pizza);
    _db.SaveChanges();
    return CreatedAtAction(nameof(GetById), new { id = pizza.Id }, pizza);
  }

  [HttpPut("{id}")]
  public IActionResult Update(int id, Pizza updated)
  {
    var pizza = _db.Pizzas.Find(id);
    if (pizza == null) return NotFound();

    pizza.Nome = updated.Nome;
    pizza.Preco = updated.Preco;
    pizza.UpdatedAt = DateTime.Now;
    _db.SaveChanges();
    return Ok(pizza);
  }

  [HttpDelete("{id}")]
  public IActionResult Delete(int id)
  {
    var pizza = _db.Pizzas.Find(id);
    if (pizza == null) return NotFound();

    pizza.IsDeleted = true;
    pizza.UpdatedAt = DateTime.Now;
    _db.SaveChanges();
    return Ok(new { message = "Pizza removida" });
  }
}