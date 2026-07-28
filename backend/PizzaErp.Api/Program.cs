using PizzaErp.Api.Data;
using PizzaErp.Api.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
  options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseAuthorization();
app.MapControllers();

// Auto-create DB + seed
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();

    if (!db.Users.Any())
    {
        db.Users.Add(new User
        {
            Name = "Admin",
            Email = "admin@pizza.com",
            Password = BCrypt.Net.BCrypt.HashPassword("123456"),
            Role = "Admin"
        });

        db.Pizzas.AddRange(
            new Pizza { Nome = "Calabresa", Preco = 25 },
            new Pizza { Nome = "Margherita", Preco = 30 },
            new Pizza { Nome = "Pepperoni", Preco = 35 },
            new Pizza { Nome = "Frango com Catupiry", Preco = 32 },
            new Pizza { Nome = "Portuguesa", Preco = 28 },
            new Pizza { Nome = "Quatro Queijos", Preco = 38 },
            new Pizza { Nome = "Chocolate", Preco = 30 },
            new Pizza { Nome = "Romeu e Julieta", Preco = 33 }
        );

        db.SaveChanges();
    }
}

app.Run();