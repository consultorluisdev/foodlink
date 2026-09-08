using Microsoft.AspNetCore.Mvc;
using api.Data;
using api.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq.Expressions;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    public AuthController(AppDbContext context)
    {
        _context = context;
    }
    // register endpont
    [HttpPost("register")]
    public async Task<IActionResult> Register(User user)
    {
        try
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Usuario criado com sucesso" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = "Erro ao criar usuario", error = ex.Message });
        }
    }
    // login endpoint
        [HttpPost("login")]
        public async Task<IActionResult> Login(User login)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == login.Email && x.Password == login.Password);

            if (user == null)
                return Unauthorized(new { message = "Email ou senha inaválidos" });

            return Ok(new { message = "Login Ok ", user.Email });
        }

    }
