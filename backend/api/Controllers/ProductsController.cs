using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Entities;
using api.DTOs.Products;
using api.DTOs.Product;
using Microsoft.AspNetCore.Http.HttpResults;

namespace api.Controllers;

  [ApiController]
  [Route("api/[controller]")]
  public class ProductsController : ControllerBase
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
      .Include(p => p.Category)
      .AsQueryable();

      // filtro por ativo
      if (active.HasValue)
        query = query.Where(p => p.IsActive == active.Value);

      // filtro por categoria
      if (categoryId.HasValue)
        query = query.Where(p => p.CategoryId == categoryId.Value);

      // busca por nome ou descricao
      if (!string.IsNullOrWhiteSpace(search))
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

      return Ok(products);
      }
    // get api/products/{id}
    [HttpGet("{id}")]
      public async Task<ActionResult<ProductResponseDto>> GetProduct(int id)
  {
    var products = await _context.Products
      .Include(p => p.Category)
      .Where(p => p.Id == id)
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
      .FirstOrDefaultAsync();
    if (products == null)
      return NotFound(new { message = "Produto não encontrado" });

    return Ok(products);
      }

  // post: api/products
  [HttpPost]
  public async Task<ActionResult<ProductResponseDto>> CreateProduct(CreateProductDto createDto)
  {
    // validar se categoria existe
    var categoryExists = await _context.Categories
      .AnyAsync(c => c.Id == createDto.CategoryId);

    if (!categoryExists)
      return NotFound(new { message = "Categoria não encontrada " });
    var product = new Product
    {
      Name = createDto.Name,
      Description = createDto.Description,
      Price = createDto.Price,
      CostPrice = createDto.CostPrice,
      Stock = createDto.Stock,
      CategoryId = createDto.CategoryId,
      ImageUrl = createDto.ImageUrl,
      IsActive = createDto.IsActive,
      CreatedAt = DateTime.UtcNow,
      UpdatedAt = DateTime.UtcNow
    };
    _context.Products.Add(product);
    await _context.SaveChangesAsync();

    // recarregar com category
    await _context.Entry(product)
    .Reference(p => p.Category)
    .LoadAsync();

    var response = new ProductResponseDto
    {
      Id = product.Id,
      Name = product.Name,
      Description = product.Description,
      Price = product.Price,
      CostPrice = product.CostPrice,
      Stock = product.Stock,
      CategoryId = product.CategoryId,
      CategoryName = product.Category?.Name,
      ImageUrl = product.ImageUrl,
      IsActive = product.IsActive,
      CreatedAt = product.CreatedAt,
      UpdatedAt = product.UpdatedAt
    };
    return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, response);
  }

  // put: api/products/{id}
  [HttpPut("{id}")]
  public async Task<ActionResult> UpdateProduct(int id, UpdateProductDto updateDto)
  {
    // validar se categoria existe
    var product = await _context.Products.FindAsync(id);
    if (product == null)
      return NotFound(new { message = "Produto não encontrado" });

    // validar se categoria existe
    var categoryExists = await _context.Categories
      .AnyAsync(c => c.Id == updateDto.CategoryId);

    if (!categoryExists)
      return NotFound(new { message = "Categoria não encontrada " });

    product.Name = updateDto.Name;
    product.Description = updateDto.Description;
    product.Price = updateDto.Price;
    product.CostPrice = updateDto.CostPrice;
    product.Stock = updateDto.Stock;
    product.CategoryId = updateDto.CategoryId;
    product.ImageUrl = updateDto.ImageUrl;
    product.IsActive = updateDto.IsActive;
    product.UpdatedAt = DateTime.UtcNow;

    await _context.SaveChangesAsync();

    return Ok(new { message = "Produto atualizado com sucesso " });
  }

  // path: api/product/{id}/status
  [HttpPatch("{id}/status")]
  public async Task<IActionResult> UpdateProductStatus(int id, UpdateProductStatusDto statusDto)
  {
    var product = await _context.Products.FindAsync(id);
    if (product == null)
      return NotFound(new { message = "Produto não encontrado " });

    product.IsActive = statusDto.IsActive;
    product.UpdatedAt = DateTime.UtcNow;

    await _context.SaveChangesAsync();

    return Ok(new
    {
      message = $"Produto {(statusDto.IsActive ? "ativado" : "desativado")} com sucesso",
      isActive = product.IsActive
    });
  }
  // delete api/products/{id}
  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteProduct(int id)
  {
    var product = await _context.Products.FindAsync(id);
    if (product == null)
      return NotFound(new { message = "Produto não encontrado" });

    // verificar se há pedidos ou vendas
    // por enquanto permitir exclusão direta

    _context.Products.Remove(product);
    await _context.SaveChangesAsync();

    return NoContent();
  }

}
