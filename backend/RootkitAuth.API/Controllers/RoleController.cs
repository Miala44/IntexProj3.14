using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
namespace RootkitAuth.API.Controllers
{
    [Route("Role")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<IdentityUser> _userManager;
        public RoleController(RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }
        // POST: /Role/AddRole
        [HttpPost("AddRole")]
        //[Authorize(Roles = "Admin")] // Optional: Only Admins can add roles
        public async Task<IActionResult> AddRole([FromBody] string roleName)
        {
            if (string.IsNullOrWhiteSpace(roleName))
                return BadRequest("Role name cannot be empty.");
            var exists = await _roleManager.RoleExistsAsync(roleName);
            if (exists)
                return BadRequest("Role already exists.");
            var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
            return result.Succeeded ? Ok($"? Role '{roleName}' created.")
                                    : StatusCode(500, "? Failed to create role.");
        }
        // POST: /Role/AssignRoleToUser
        [HttpPost("AssignRoleToUser")]
        //[Authorize(Roles = "Admin")] // Optional: Only Admins can assign roles
        public async Task<IActionResult> AssignRoleToUser([FromBody] RoleAssignmentDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                return NotFound("? User not found.");
            var roleExists = await _roleManager.RoleExistsAsync(dto.Role);
            if (!roleExists)
                return BadRequest("? Role does not exist.");
            var result = await _userManager.AddToRoleAsync(user, dto.Role);
            return result.Succeeded ? Ok($"? Role '{dto.Role}' assigned to '{dto.Email}'.")
                                    : StatusCode(500, "? Failed to assign role.");
        }
    }
    public class RoleAssignmentDto
    {
        public string Email { get; set; }
        public string Role { get; set; }
    }
}