using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Entities;
using api.DTOs.Products;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProdutosController : ControllerBase
{
  private readonly AppDbContext _context;

  public ProductsController(AppDbContext context)
  {
    _context = context;
  }

  // get: api/products
  [HttpGet]
  public async Task<ActionResult<IEnumerable<ProductResponseDto>>> GetProducts(
    [FromQuery] bool? active = null,
    [FromQuery] int? categoryId = null,
    [FromQuery] string? search = null)
    {
      var query = _context.Products
      .Include(p => p.category)
      .AsQueryable();

      // filtro por ativo
      if(active.HasValue)
        query = query.Where(p => p.IsActive == active.Value);

      // filtro por categoria
      if(categoryId.HasValue)
        query = query.Where(p => p.CategoryId == categoryId.Value);

      // busca por nome ou descricao
      if(!string.ISNullOrWhiteSpace(search))
      {
        query = query.Where(p => p.Name.Contains(search) ||
        (p.Description != null && p.Description.Contains(search)));
      }

      var products = await query
        .OrderBy(p => p.Name)
        .Select(p => new ProductResponseDto
        {
          Id = p.Id,
          Name = p.Name,
          Description = p.Description,
          Price = p.Price,
          CostPrice = p.CostPrice,
          Stock = p.Stock,
          CategoryId = p.CategoryId,
          CategoryName = p.Category != null ? p.Category.Name : null,
          ImageUrl = p.ImageUrl,
          IsActive = p.IsActive,
          CreatedAt = p.CreatedAt,
          UpdatedAt = p.UpdatedAt
        })
        .ToListAsync();

      return Ok(products)
    }
    // get api/products/{id}
    [HttpGet{id}]
    public async Task<ActionResult<ProductResponseDto>> GetProduct(int id)
    {
      var products = await _context.Products
        .Include(p => p.Category)
        .Where(p => p.Id == id)
        .Select(p => new ProductResponseDto
        {
          Id = p.Id,
          Name = p.Name
          Description = p.Description,
          Price = .p.Price,
          CostPrice = p.CostPrice,
          Stock = p.Stock,
          CategoryId = p.CategoryId,
          CategoryName = p.Category != null ? p.Category.Name : null,
          ImageUrl = p.ImageUrl,
          IsActive = p.IsActive,
          CreatedAt = p.CreatedAt,
          UpdatedAt = p.UpdatedAt
        })
        .FirstOrDefaultAsync();
      if(product == null)
        return NotFound(new { message = "Produto não encontrado" });

      return  Ok(products)
    }

    // post: api/products
    [HttpPost]
}
