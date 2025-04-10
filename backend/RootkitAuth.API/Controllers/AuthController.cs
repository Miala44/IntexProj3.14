using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
namespace RootkitAuth.API.Controllers
{
    [Route("auth")]
    public class AuthController : Controller
    {
        [HttpGet("login")]
        public IActionResult Login(string returnUrl = "http://localhost:3000/movie")
        {
            var props = new AuthenticationProperties { RedirectUri = returnUrl };
            return Challenge(props, GoogleDefaults.AuthenticationScheme);
        }
        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);
            return Redirect("http://localhost:3000/");
        }
        [HttpGet("signin-google")]
        public async Task<IActionResult> GoogleCallback()
        {
            var result = await HttpContext.AuthenticateAsync(IdentityConstants.ExternalScheme);
            if (!result.Succeeded)
                return Redirect("/auth/login");
            var externalUser = result.Principal;
            var email = externalUser.FindFirstValue(ClaimTypes.Email);
            var userManager = HttpContext.RequestServices.GetRequiredService<UserManager<IdentityUser>>();
            var signInManager = HttpContext.RequestServices.GetRequiredService<SignInManager<IdentityUser>>();
            // Check if user already exists
            var user = await userManager.FindByEmailAsync(email);
            if (user == null)
            {
                user = new IdentityUser { Email = email, UserName = email };
                await userManager.CreateAsync(user);
            }
            // Sign in the user
            await signInManager.SignInAsync(user, isPersistent: false);
            return Redirect("http://localhost:3000"); // Or wherever your frontend is
        }
    }
}