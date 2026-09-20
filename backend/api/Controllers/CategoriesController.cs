using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Entities;
using api.DTOs.Categories;
using api.DTOs.Products;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
  private readonly AppDbContext _context;

  public CategoriesController(AppDbContext context)
  {
    _context = context;
  }

  // get api/categories
  [HttpGet]
  [AllowAnonymous]
  public async Task<ActionResult<IEnumerable<CategoryResponseDto>>> GetCategories()
  {
    var categories = await _context.Categories
    .Include(c => c.Products)
    .OrderBy(c => c.Name)
    .Select(c => new CategoryResponseDto
    {
      Id = c.Id,
      Name = c.Name,
      IsActive = c.IsActive,
      CreatedAt = c.CreatedAt,
      UpdatedAt = c.UpdatedAt,
      ProductCount = c.Products.Count
    })
    .ToListAsync();

    return Ok(categories);
  }
  // get : api/Categories/{id}
  [HttpGet("{id}")]
  [AllowAnonymous]
  public async Task<ActionResult<CategoryResponseDto>> GetCategory(int id)
  {
    var category = await _context.Categories
    .Include(c => c.Products)
    .Where(c => c.Id == id)
    .Select(c => new CategoryResponseDto
    {
      Id =  c.Id,
      Name = c.Name,
      IsActive = c.IsActive,
      CreatedAt = c.CreatedAt,
      UpdatedAt = c.UpdatedAt,
      ProductCount = c.Products.Count
    })
    .FirstOrDefaultAsync();

    if(category == null)
      return NotFound(new { message = "Categoria não encontrada" });

    return Ok(category);
  }

  // post: api/categoires
  [HttpPost]
  [AllowAnonymous]
  public async Task<ActionResult<CategoryResponseDto>> CreatedCategory(CreateCategoryDto createDto)
  {
    // verefica se já existe categoria do mesmo nome
    var exists = await _context.Categories
    .AnyAsync(c => c.Name.ToLower() == createDto.Name.ToLower());

    if(exists)
      return Conflict(new { message = "Já existe uma categoria com este nome"});

      var category = new Category
      {
        Name = createDto.Name,
        Description = createDto.Description,
        IsActive = createDto.IsActive,
        CreatedAt = DateTime.UtcNow,
        UpdatedAt = DateTime.UtcNow
      };
      _context.Categories.Add(category);
      await _context.SaveChangesAsync();

      var response = new CategoryResponseDto
      {
        Id = category.Id,
        Name = category.Name,
        Description = category.Description,
        IsActive = category.IsActive,
        CreatedAt = category.CreatedAt,
        UpdatedAt = category.UpdatedAt,
        ProductCount = 0
      };
      return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, response);
  }

      // put: api/categorories/{id}
      [HttpPut("{id}")]
      [AllowAnonymous]
      public async Task<IActionResult> UpdatedCategory(int id, UpdateCategoryDto updateDto)
  {
   var category = await _context.Categories.FindAsync(id);
   if(category == null)
      return NotFound(new { message = "Categoria não encontrada "});

   var exists = await _context.Categories
      .AnyAsync(c => c.Id != id && c.Name.ToLower() == updateDto.Name.ToLower());
    if(exists)
      return Conflict(new { message = "Já existe uma categoria com este nome"});

        category.Name = updateDto.Name;
        category.Description = updateDto.Description;
        category.IsActive = updateDto.IsActive;
        category.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Categoria atualizada com sucesso" });
  }
  // delete: api/categories{id}
  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteCategory(int id)
  {
    var category  = await _context.Categories
      .Include(c => c.Products)
      .FirstOrDefaultAsync(c => c.Id == id);

    if(category == null)
      return NotFound(new { message = "Categoria não encontrada" });

    // verifica se existem produtos vinculados
    if (category.Products.Any())
    {
      return Conflict(new
      {
        message = "Não é possivel excluir a categoria pois já existeem produtos vinculados",
        productCount = category.Products.Count
      });
    }
    _context.Categories.Remove(category);
    await _context.SaveChangesAsync();

    return NoContent();
  }
}
