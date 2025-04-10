//using System.Security.Claims;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.EntityFrameworkCore;
//using RootkitAuth.API.Data;
//using RootkitAuth.API.Data.NewDbModels;
//using RootkitAuth.API.Services;
//using Microsoft.AspNetCore.Authentication.Google;

//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.

//builder.Services.AddControllers();
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//builder.Services.AddDbContext<CompetitionDbContext>(options =>
//    options.UseSqlite(builder.Configuration.GetConnectionString("CompetitionConnection")));

//builder.Services.AddDbContext<ApplicationDbContext>(options =>
//    options.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection")));

//builder.Services.AddDbContext<MovieDbContext>(options =>
//    options.UseSqlite(builder.Configuration.GetConnectionString("MoviesTitleConnection")));

//builder.Services.AddAuthorization();

//builder.Services.AddIdentityApiEndpoints<IdentityUser>()
//    .AddEntityFrameworkStores<ApplicationDbContext>();

//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultScheme = IdentityConstants.ApplicationScheme;
//    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
//})
//    .AddGoogle(options =>
//    {
//        options.ClientId = builder.Configuration["Authentication:Google:ClientId"];
//        options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
//        options.CallbackPath = "/signin-google"; // Must match Google Cloud Console
//    });

//builder.Services.Configure<IdentityOptions>(options =>
//{
//    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
//    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email; // Ensure email is stored in claims
//});

//builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();

////builder.Services.ConfigureApplicationCookie(options =>
////{
////    options.Cookie.HttpOnly = true;
////    options.Cookie.SameSite = SameSiteMode.None; // Allow cross-site cookies fix after deployment
////    options.Cookie.Name = ".AspNetCore.Identity.Application"; // Ensure this matches your frontend cookie name
////    options.LoginPath = "/login"; // Set your login path
////    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Always use secure cookies


////});
//builder.Services.ConfigureApplicationCookie(options =>
//{
//    options.Cookie.HttpOnly = true;
//    options.Cookie.SameSite = SameSiteMode.None;
//    options.Cookie.Name = ".AspNetCore.Identity.Application";
//    options.LoginPath = "/login";
//    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;

//    // ← Add this block
//    options.Events.OnRedirectToLogin = context =>
//    {
//        if (context.Request.Path.StartsWithSegments("/Movies"))
//        {
//            context.Response.StatusCode = 401;
//            return Task.CompletedTask;
//        }

//        context.Response.Redirect(context.RedirectUri);
//        return Task.CompletedTask;
//    };
//});


//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowFrontend",
//        policy =>
//        {
//            policy.WithOrigins("http://localhost:3000") // Replace with your frontend URL
//                .AllowCredentials() // Required to allow cookies
//                .AllowAnyMethod()
//                .AllowAnyHeader();
//        });
//});
//var app = builder.Build();

////  FORCE Content-Security-Policy header to allow Flask API
//app.Use(async (context, next) =>
//{
//    context.Response.OnStarting(() =>
//    {
//        context.Response.Headers.Remove("Content-Security-Policy");
//        context.Response.Headers.Append("Content-Security-Policy",
//            "default-src 'self'; connect-src 'self' http://127.0.0.1:5050 http://localhost:5050 https://localhost:5000;");
//        return Task.CompletedTask;
//    });

//    await next();
//});


//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//app.UseCors("AllowFrontend");
//app.UseHttpsRedirection();

//app.UseAuthentication();
//app.UseAuthorization();

//app.MapControllers();
//app.MapIdentityApi<IdentityUser>();

//app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
//{
//    await signInManager.SignOutAsync();

//    // Ensure authentication cookie is removed
//    context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
//    {
//        HttpOnly = true,
//        SameSite = SameSiteMode.None, // Ensure this matches your frontend cookie settings
//        Secure = true // Always use secure cookies
//    });

//    return Results.Ok(new { message = "Logout successful" });
//}).RequireAuthorization();


//app.MapGet("/pingauth", (ClaimsPrincipal user) =>
//{
//    if (!user.Identity?.IsAuthenticated ?? false)
//    {
//        return Results.Unauthorized();
//    }

//    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com"; // Ensure it's never null
//    return Results.Json(new { email = email }); // Return as JSON
//}).RequireAuthorization();

//app.Run();


using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RootkitAuth.API.Data;
using RootkitAuth.API.Data.NewDbModels;
using RootkitAuth.API.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<CompetitionDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("CompetitionConnection")));

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("IdentityConnection")));

builder.Services.AddDbContext<MovieDbContext>(options =>
{
    var opts = options.UseSqlite(builder.Configuration.GetConnectionString("MoviesTitleConnection"));

    if (builder.Environment.IsDevelopment())
    {
        opts.EnableSensitiveDataLogging()
            .LogTo(Console.WriteLine, LogLevel.Information);
    }
});

builder.Services.AddAuthorization();

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = IdentityConstants.ApplicationScheme;
    options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
})
.AddGoogle(options =>
{
    options.ClientId = builder.Configuration["Authentication:Google:ClientId"];
    options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];
    options.CallbackPath = "/signin-google";
});

builder.Services.Configure<IdentityOptions>(options =>
{
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email;
});

builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();
builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender<IdentityUser>>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.LoginPath = "/login";
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;

    options.Events.OnRedirectToLogin = context =>
    {
        if (context.Request.Path.StartsWithSegments("/Movies"))
        {
            context.Response.StatusCode = 401;
            return Task.CompletedTask;
        }
        context.Response.Redirect(context.RedirectUri);
        return Task.CompletedTask;
    };
});



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowCredentials()
              .AllowAnyHeader()
              .AllowAnyMethod()
              .SetIsOriginAllowed(origin => true); // <- Add this for dev only
    });
});


var app = builder.Build();

Console.WriteLine(":jigsaw: Identity DB: " + Path.GetFullPath("Identity.sqlite"));
Console.WriteLine(":clapper: Movies DB: " + Path.GetFullPath("Movies.db"));

app.Use(async (context, next) =>
{
    context.Response.OnStarting(() =>
    {
        context.Response.Headers.Remove("Content-Security-Policy");
        context.Response.Headers.Append("Content-Security-Policy",
            "default-src 'self'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
            "img-src 'self' data:; " +
            "connect-src 'self' http://localhost:5000 wss://localhost:56468 https://accounts.google.com https://apis.google.com;");
        return Task.CompletedTask;
    });

    await next();
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapIdentityApi<IdentityUser>();

app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();

    context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
    {
        HttpOnly = true,
        SameSite = SameSiteMode.None,
        Secure = true
    });

    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();

app.MapGet("/pingauth", async (ClaimsPrincipal user, UserManager<IdentityUser> userManager) =>
{
    if (!user.Identity?.IsAuthenticated ?? false)
    {
        return Results.Unauthorized();
    }

    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com";
    var appUser = await userManager.FindByEmailAsync(email);
    var roles = appUser != null ? await userManager.GetRolesAsync(appUser) : new List<string>();

    return Results.Json(new { email, roles });
}).RequireAuthorization();

app.Run();
