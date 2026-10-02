using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public static class DbSeeder
{
  private const int EstoqueInicial = 100;
  private const decimal FatorCusto = 0.60m;

  private const string ImgFrango1 = "/images/frango1.jpeg";
  private const string ImgFrango2 = "/images/frango2.jpeg";
  private const string ImgPizza = "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=250&fit=crop";
  private const string ImgBebida = "https://images.unsplash.com/photo-1559320643-dbdcb0b29a7c?w=400&h=250&fit=crop";

  private sealed record CategoriaSeed(string Nome, string Descricao);

  private sealed record ProdutoSeed(
    string Nome,
    string Descricao,
    string Categoria,
    decimal Preco,
    string? Imagem);

  private static readonly CategoriaSeed[] Categorias =
  [
    new("Assados", "Frangos assados, temperados do jeito da casa."),
    new("Combos", "Combos de frango assado com acompanhamentos."),
    new("Pizzas", "Pizzas salgadas e doces, individuais."),
    new("Bebidas", "Refrigerantes, sucos e aguas.")
  ];

  private static readonly ProdutoSeed[] Produtos =
  [
    new("Frango Assado Inteiro",
        "Frango inteiro assado, temperos da casa. Serve 3-4.",
        "Assados", 60m, ImgFrango1),
    new("Meio Frango Assado",
        "Frango pequeno assado, temperado de casa. Serve 1-2.",
        "Assados", 35m, ImgFrango2),
    new("Frango Assado + Maionese + Farofa",
        "O combo classico do Foodlink: frango assado, maionese cremosa e farofa temperada. Serve 3-4.",
        "Combos", 75m, ImgFrango1),
    new("Meio Frango + Farofa",
        "Meio frango assado acompanhado de farofa. Serve 1-2.",
        "Combos", 45m, ImgFrango2),
    new("Combo Familia 2 Frangos",
        "2 frangos assados, maionese e farofa. Serve 6-8.",
        "Combos", 180m, ImgFrango1),
    new("Combo Familia de Pizzas",
        "10 pizzas salgadas + 2 doces. Serve 6.",
        "Pizzas", 100m, ImgPizza),
    new("Pizza de Frango",
        "Molho de tomate, mussarela e frango.",
        "Pizzas", 10m, ImgPizza),
    new("Pizza de Calabresa",
        "Molho de tomate, mussarela, calabresa e oregao.",
        "Pizzas", 10m, ImgPizza),
    new("Pizza de Portuguesa",
        "Molho de tomate, mussarela, presunto, cebola e azeitona.",
        "Pizzas", 10m, ImgPizza),
    new("Pizza de Lombo-Canadense",
        "Molho de tomate, mussarela, lombo e cream cheese.",
        "Pizzas", 10m, ImgPizza),
    new("Pizza de Pepperoni",
        "Molho de tomate, mussarela e pepperoni.",
        "Pizzas", 10m, ImgPizza),
    new("Pizza de 4 Queijos",
        "Molho de tomate, mussarela, parmesao, catupiry e cream cheese.",
        "Pizzas", 10m, ImgPizza),
    new("Pizza de Chocolate Preto",
        "Leite condensado e chocolate preto.",
        "Pizzas", 10m, ImgPizza),
    new("Pizza de Chocolate Branco",
        "Leite condensado e chocolate branco.",
        "Pizzas", 10m, ImgPizza),
    new("Refrigerante 2L",
        "Coca-Cola, Guarana ou Fanta. 2L.",
        "Bebidas", 12m, ImgBebida),
    new("Suco Natural",
        "Suco de laranja natural 500ml.",
        "Bebidas", 9m, ImgBebida),
    new("Agua Mineral 500ml",
        "Agua mineral sem gas.",
        "Bebidas", 5m, ImgBebida)
  ];

  public static async Task SeedAsync(AppDbContext db)
  {
    await SeedAdminAsync(db);
    var categorias = await SeedCategoriasAsync(db);
    await SeedProdutosAsync(db, categorias);
  }

  private static async Task SeedAdminAsync(AppDbContext db)
  {
    if (await db.Users.AnyAsync())
      return;

    db.Users.Add(new User
    {
      Name = "Admin",
      Email = "admin@foodlink.com",
      Password = BCrypt.Net.BCrypt.HashPassword("admin123"),
      Role = "Admin"
    });

    await db.SaveChangesAsync();
  }

  private static async Task<Dictionary<string, Category>> SeedCategoriasAsync(AppDbContext db)
  {
    var existentes = await db.Categories.ToDictionaryAsync(c => c.Name);

    var faltantes = Categorias
      .Where(c => !existentes.ContainsKey(c.Nome))
      .Select(c => new Category
      {
        Name = c.Nome,
        Description = c.Descricao,
        IsActive = true,
        CreatedAt = DateTime.UtcNow,
        UpdatedAt = DateTime.UtcNow
      })
      .ToList();

    if (faltantes.Any())
    {
      db.Categories.AddRange(faltantes);
      await db.SaveChangesAsync();
    }

    return await db.Categories.ToDictionaryAsync(c => c.Name);
  }

  private static async Task SeedProdutosAsync(AppDbContext db, Dictionary<string, Category> categorias)
  {
    if (await db.Products.AnyAsync())
      return;

    var agora = DateTime.UtcNow;

    db.Products.AddRange(Produtos.Select(p => new Product
    {
      Name = p.Nome,
      Description = p.Descricao,
      Price = p.Preco,
      CostPrice = Math.Round(p.Preco * FatorCusto, 2),
      Stock = EstoqueInicial,
      CategoryId = categorias[p.Categoria].Id,
      ImageUrl = p.Imagem,
      IsActive = true,
      CreatedAt = agora,
      UpdatedAt = agora
    }));

    await db.SaveChangesAsync();
  }
}