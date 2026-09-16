using api.Services;
using Microsoft.Extensions.Configuration;
using api.Controllers;
using api.Data;
using api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace foodlink.Api.Tests.Auth;

public class AuthControllerTests
{
    private AppDbContext CriarContexto()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new AppDbContext(options);
    }

    private static IConfiguration CriarConfigFalso()
    {
        return new ConfigurationBuilder()
        .AddInMemoryCollection(new Dictionary<string, string?>
        {
            {"Jwt:Key", "teste-Key-minimum-32-chars-long!!"},
            {"Jwt:Issuer", "teste-Issuer"},
            {"Jwt:Audience", "teste-Audience"},
            {"Jwt:ExpiresInHours", "24"}
        })
        .Build();
    }
    private (AuthController controller, AppDbContext context)CriarController()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        var context = new AppDbContext(options);
        var tokenService = new TokenService(CriarConfigFalso());
        var controller = new AuthController(context, tokenService);

        return (controller, context);

    }


    [Fact]
    public async Task Register_DeveCriarUsuarioComSucesso()
    {
        // Arrange
        var (controller, context) = CriarController();
        var dto = new RegisterDto("Teste", "teste@foodlink.com", "123456");

        // Act
        var resultado = await controller.Register(dto);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(resultado);

        var usuario = await context.Users
            .FirstOrDefaultAsync(x => x.Email == "teste@foodlink.com");

        Assert.NotNull(usuario);
        Assert.Equal("teste@foodlink.com", usuario.Email);
        Assert.True(BCrypt.Net.BCrypt.Verify("123456", usuario.Password));
    }

    [Fact]
    public async Task Register_DeveRetornarBadRequest_QuandoEmailDuplicado()
    {
        // Arrange
        var (controller, context) = CriarController();
        var primeiroDto = new RegisterDto("Primeiro", "duplicado@foodlink.com", "123456");
        var segundoDto = new RegisterDto("Segundo", "duplicado@foodlink.com", "654321");

        // Act
        await controller.Register(primeiroDto);
        var resultado = await controller.Register(segundoDto);

        // Assert
        Assert.IsType<BadRequestObjectResult>(resultado);
    }
}
