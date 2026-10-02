using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.Entities;
using api.Services;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq.Expressions;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly TokenService _tokenService;
    public AuthController(AppDbContext context, TokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    // register endpont
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Name))
            return BadRequest(new { message = "Nome é obrigatório " });

        if (!IsValidEmail(dto.Email))
            return BadRequest(new { message = "Email Inválido" });

        if (dto.Password.Length < 6)
            return BadRequest(new { message = "Senha deve ter no mínimo 6 caracteres" });

        if (await _context.Users.AnyAsync(x => x.Email == dto.Email))
            return BadRequest(new { message = "Email já cadastrado" });

        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            Role = "Operador"
        };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Usuario criado com sucesso " });
    }
    // login endpoint
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            return Unauthorized(new { message = "Email ou senha inaválidos" });

        var token = _tokenService.Generate(user);

        return Ok(new
        {
            token,
            user = new { user.Id, user.Name, user.Email, user.Role }
        });

    }
    private static bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }

}
