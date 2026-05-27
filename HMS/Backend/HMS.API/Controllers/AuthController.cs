using HMS.API.Helpers;
using HMS.Core.DTOs;
using HMS.Core.Entities;
using HMS.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace HMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly JwtHelper _jwtHelper;

        public AuthController(ApplicationDbContext context, JwtHelper jwtHelper)
        {
            _context = context;
            _jwtHelper = jwtHelper;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var user = await _context.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Username == request.Username);

            // NOTE: In a production environment, never compare plain-text passwords.
            // For this project, we use simple comparison, but recommend using BCrypt.Net-Next or ASP.NET Core Identity.
            if (user == null || user.PasswordHash != request.Password)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            if (!user.IsActive)
            {
                return BadRequest(new { message = "Account is disabled" });
            }

            var token = _jwtHelper.GenerateToken(user);

            return Ok(new AuthResponse
            {
                Token = token,
                Username = user.Username,
                Role = user.Role.Name,
                UserId = user.Id
            });
        }
    }
}
