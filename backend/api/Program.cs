using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using api.Data;
using api.Entities;
using api.Services;

var builder = WebApplication.CreateBuilder(args);
var connectionString = Environment.GetEnvironmentVariable("FOODLINK_DB_CONNECTION") ?? builder.Configuration.GetConnectionString("DefaultConnection");

if(string.IsNullOrWhiteSpace(connectionString))
    throw new InvalidOperationException(
        "Connection string não configurada. Defina FOODLINK_DB_CONNECTION ou ConnectionStrings:DefaultConnection."
    );
var jwtKey = Environment.GetEnvironmentVariable("FOODLINK_JWT_KEY") ?? builder.Configuration["Jwt:Key"];

if (string.IsNullOrWhiteSpace(jwtKey))
    throw new InvalidOperationException(
        "JWT key não configurada. Defina FOODLINK_JWT_KEY ou Jwt:Key."
    );

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddScoped<TokenService>();

var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));

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
    IssuerSigningKey = signingKey
    };
});

builder.Services.AddAuthorization();

var allowedOrigins = Environment.GetEnvironmentVariable("FOODLINK_ALLOWED_ORIGINS")
?.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
?? [
    "http://localhost:5174",
    "http://localhost:5173",
    "http://catalogo.foodlink.com.br"
];
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
       {
           policy.WithOrigins(allowedOrigins)
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
    await DbSeeder.SeedAsync(db);
}

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

app.Run();
