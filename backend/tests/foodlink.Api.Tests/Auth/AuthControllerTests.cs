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

    [Fact]
    public async Task Register_DeveCriarUsuarioComSucesso()
    {
        // Arrange
        await using var context = CriarContexto();
        var controller = new AuthController(context);

        var user = new User
        {
            Email = "teste@foodlink.com",
            Password = "123456"
        };

        // Act
        var resultado = await controller.Register(user);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(resultado);

        var usuario = await context.Users
            .FirstOrDefaultAsync(x => x.Email == "teste@foodlink.com");

        Assert.NotNull(usuario);
        Assert.Equal("teste@foodlink.com", usuario.Email);
        Assert.Equal("123456", usuario.Password);
    }

    [Fact]
    public async Task Register_DeveRetornarBadRequest_QuandoEmailDuplicado()
    {
        // Arrange
        await using var context = CriarContexto();
        var controller = new AuthController(context);

        var primeiroUsuario = new User
        {
            Email = "duplicado@foodlink.com",
            Password = "123456"
        };

        var segundoUsuario = new User
        {
            Email = "duplicado@foodlink.com",
            Password = "654321"
        };

        // Act
        await controller.Register(primeiroUsuario);
        var resultado = await controller.Register(segundoUsuario);

        // Assert
        Assert.IsType<BadRequestObjectResult>(resultado);
    }
}    
