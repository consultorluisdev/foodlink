using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using api.Data;
using api.Entities;
using api.Services;

var builder = WebApplication.CreateBuilder(args);
var connectionString = Environment.GetEnvironmentVariable("FOODLINK_DB_CONNECTION") ?? builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<TokenService>();


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
    ValidateIssuer = true,
    ValidateAudience = true,
    ValidateIssuerSigningKey = true,
    ValidateLifetime = true,
    ValidAudience = builder.Configuration["Jwt:Audience"],
    ValidIssuer = builder.Configuration["Jwt:Issuer"],
    IssuerSigningKey = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
    };

});

builder.Services.AddAuthorization();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
       {
           policy.WithOrigins(
            "http://localhost:5174",
            "http://localhost:5173",
            "http://catalogo.foodlink.com.br"
           )
                 .AllowAnyMethod()
                 .AllowAnyHeader()
                 .AllowCredentials();
       });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();

    if (!db.Users.Any())
    {
        db.Users.Add(new User
        {
            Name = "Admin",
            Email = "admin@foodlink.com",
            Password = BCrypt.Net.BCrypt.HashPassword("admin123"),
            Role = "Admin"
        });
        db.SaveChanges();
    }

    if (!db.Categories.Any())
    {
        var lanches = new Category { Name = "Lanches", Description = "Sanduíches e hambúrgueres", IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow };
        var bebidas = new Category { Name = "Bebidas", Description = "Refrigerantes, sucos e águas", IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow };
        var porcoes = new Category { Name = "Porções", Description = "Porções para compartilhar", IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow };
        var sobremesas = new Category { Name = "Sobremesas", Description = "Doces e sobremesas", IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow };

        db.Categories.AddRange(lanches, bebidas, porcoes, sobremesas);
        db.SaveChanges();

        db.Products.AddRange(
            new Product { Name = "X-Burger", Description = "Hambúrguer clássico", Price = 22.00m, CostPrice = 10.00m, Stock = 50, CategoryId = lanches.Id, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Product { Name = "X-Bacon", Description = "Hambúrguer com bacon crocante", Price = 25.00m, CostPrice = 12.00m, Stock = 50, CategoryId = lanches.Id, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Product { Name = "X-Tudo", Description = "Hambúrguer completo", Price = 30.00m, CostPrice = 15.00m, Stock = 50, CategoryId = lanches.Id, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Product { Name = "Coca-Cola 350ml", Description = "Lata 350ml", Price = 7.00m, CostPrice = 3.50m, Stock = 100, CategoryId = bebidas.Id, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Product { Name = "Suco Natural", Description = "Suco de laranja natural", Price = 10.00m, CostPrice = 4.00m, Stock = 50, CategoryId = bebidas.Id, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Product { Name = "Porção de Fries", Description = "Batata frita porção", Price = 28.00m, CostPrice = 8.00m, Stock = 30, CategoryId = porcoes.Id, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow },
            new Product { Name = "Brownie c/ Sorvete", Description = "Brownie quente com sorvete", Price = 18.00m, CostPrice = 6.00m, Stock = 20, CategoryId = sobremesas.Id, IsActive = true, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow }
        );
        db.SaveChanges();
    }
}

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

app.Run();
