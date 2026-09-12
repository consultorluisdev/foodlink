namespace api.Entities;

public record RegisterDto(string Name, string Email, string Password);

public record LoginDto(string Email, string Password);