using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Evaluation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using RootkitAuth.API.Data;
using RootkitAuth.API.Data.NewDbModels;
using SameSiteMode = Microsoft.AspNetCore.Http.SameSiteMode;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

namespace RootkitAuth.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class MoviesController : ControllerBase
    {
        private MovieDbContext _movieDbContext;
        private UserManager<IdentityUser> _userManager;
        // Constructor that injects the MovieDbContext
        public MoviesController(MovieDbContext movieDbContext, UserManager<IdentityUser> userManager)
        {
            _movieDbContext = movieDbContext;
            _userManager = userManager;
        }

        // Get all movie details (title and director)
        [HttpGet("GetAllMovies")]
        public IActionResult GetAllMovies(int pageSize = 10, int pageNum = 1)
        {
            var query = _movieDbContext.MoviesTitles.AsQueryable();

            // Pagination logic (optional)
            var totalMovies = query.Count();
            var movies = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var result = new
            {
                Movies = movies,
                TotalMovies = totalMovies
            };

            return Ok(result);
        }

        [HttpGet("GetMovieById/{id}")]
        public IActionResult GetMovieById(string id)

        {
            var movie = _movieDbContext.MoviesTitles.FirstOrDefault(m => m.ShowId == id);


            if (movie == null)
            {
                return NotFound(new { Message = "Movie not found" });
            }

            return Ok(movie);
        }

        [HttpPost("Add")]
        public IActionResult AddMovie([FromBody] MoviesTitle newMovie)
        {
            _movieDbContext.MoviesTitles.Add(newMovie);
            _movieDbContext.SaveChanges();
            return Ok(newMovie);

        }


        [HttpPut("UpdateMovie/{showId}")]
        public IActionResult UpdateMovie(string showId, [FromBody] MoviesTitle updatedMovie)
        {
            Console.WriteLine($" Updating movie with showId: {showId}");

            var existingMovie = _movieDbContext.MoviesTitles.FirstOrDefault(m => m.ShowId == showId);

            if (existingMovie == null)
            {
                Console.WriteLine(" Movie not found.");
                return NotFound(new { Message = $"Movie with ID {showId} not found" });
            }

            try
            {
                Console.WriteLine(" Found movie. Updating properties...");

                existingMovie.Type = updatedMovie.Type;
                existingMovie.Title = updatedMovie.Title;
                existingMovie.Director = updatedMovie.Director;
                existingMovie.Cast = updatedMovie.Cast;
                existingMovie.Country = updatedMovie.Country;
                existingMovie.ReleaseYear = updatedMovie.ReleaseYear;
                existingMovie.Rating = updatedMovie.Rating;
                existingMovie.Duration = updatedMovie.Duration;
                existingMovie.Description = updatedMovie.Description;
                existingMovie.Genre = updatedMovie.Genre;

                Console.WriteLine(" Saving changes...");
                _movieDbContext.SaveChanges();
                Console.WriteLine(" Changes saved.");

                return Ok(existingMovie);
            }
            catch (Exception ex)
            {
                Console.WriteLine(" ERROR during update: " + ex.Message);
                return StatusCode(500, new { Message = "Something went wrong", Detail = ex.Message });
            }
        }


        [AllowAnonymous]
        [HttpPost("/register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            Console.WriteLine($":dart: Movies DB Path: {_movieDbContext.Database.GetDbConnection().ConnectionString}");
            Console.WriteLine(":inbox_tray: Incoming registration attempt");
            if (!ModelState.IsValid)
            {
                Console.WriteLine(":x: Invalid ModelState");
                return BadRequest("Invalid registration data.");
            }
            Console.WriteLine($":e-mail: Email: {model.Email}");
            Console.WriteLine($":lock: Password length: {model.Password?.Length}");
            var existingUser = await _userManager.FindByEmailAsync(model.Email);
            if (existingUser != null)
            {
                Console.WriteLine(":x: Email already exists");
                return BadRequest("Email is already registered.");
            }
            var identityUser = new IdentityUser
            {
                UserName = model.Email,
                Email = model.Email
            };
            var createResult = await _userManager.CreateAsync(identityUser, model.Password);
            if (!createResult.Succeeded)
            {
                Console.WriteLine(":x: Identity user creation failed:");
                foreach (var error in createResult.Errors)
                {
                    Console.WriteLine($"  - {error.Description}");
                }
                return BadRequest(createResult.Errors);
            }
            Console.WriteLine($":white_check_mark: Identity user created! ID: {identityUser.Id}");
            // Build movie user profile
            var movieUser = new MoviesUser
            {
                UserId = identityUser.Id, // Assign Identity User ID
                Email = model.Email,
                Name = model.Name,
                Phone = model.Phone,
                Age = model.Age,
                Gender = model.Gender,
                Netflix = model.Netflix,
                AmazonPrime = model.AmazonPrime,
                Disney = model.DisneyPlus,
                Paramount = model.ParamountPlus,
                Max = model.Max,
                Hulu = model.Hulu,
                AppleTv = model.AppleTV,
                Peacock = model.Peacock,
                City = model.City,
                State = model.State,
                Zip = model.Zip
            };
            Console.WriteLine(":inbox_tray: Creating MoviesUser:");
            Console.WriteLine($":arrow_right:  UserId: {movieUser.UserId}");
            Console.WriteLine($":arrow_right:  Email: {movieUser.Email}");
            try
            {
                Console.WriteLine(":package: Adding MoviesUser to database...");
                _movieDbContext.MoviesUsers.Add(movieUser);
                await _movieDbContext.SaveChangesAsync();
                Console.WriteLine(":white_check_mark: MoviesUser successfully saved!");
            }
            catch (Exception ex)
            {
                Console.WriteLine(":x: Failed to save MoviesUser: " + ex.Message);
                return StatusCode(500, "Server error saving user profile.");
            }
            Console.WriteLine(":tada: Registration completed successfully.");
            return Ok("User successfully registered.");
        }
        [Authorize]
        [HttpPost("rate")]
        public async Task<IActionResult> RateShow([FromBody] RateShowDto ratingDto)
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized();
            if (string.IsNullOrEmpty(ratingDto.ShowId) || ratingDto.Rating < 1 || ratingDto.Rating > 5)
                return BadRequest("Invalid rating data.");
            int userId;
            if (!int.TryParse(userIdClaim.Value, out userId))
                return BadRequest("Invalid user ID format.");
            var existingRating = await _movieDbContext.MoviesRatings
                .FirstOrDefaultAsync(r => r.UserId == userId && r.ShowId == ratingDto.ShowId);
            if (existingRating != null)
            {
                existingRating.Rating = ratingDto.Rating;
            }
            else
            {
                _movieDbContext.MoviesRatings.Add(new MoviesRating
                {
                    UserId = userId,
                    ShowId = ratingDto.ShowId,
                    Rating = ratingDto.Rating
                });
            }
            await _movieDbContext.SaveChangesAsync();
            return Ok("Rating submitted.");
        }
        [AllowAnonymous]
        [HttpGet("rating-summary/{showId}")]
        public async Task<IActionResult> GetRatingSummary(string showId)
        {
            var ratings = await _movieDbContext.MoviesRatings
                .Where(r => r.ShowId == showId)
                .ToListAsync();
            // Safely calculate average rating
            double averageRating = Math.Round(ratings.Any() ? ratings.Average(r => r.Rating)!.Value : 0, 2);
            // Get user's rating
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            int parsedUserId;
            int? userRating = null;
            if (!string.IsNullOrEmpty(userId) && int.TryParse(userId, out parsedUserId))
            {
                var userRatingRecord = ratings.FirstOrDefault(r => r.UserId == parsedUserId);
                userRating = userRatingRecord?.Rating;
            }
            return Ok(new
            {
                averageRating,
                userRating
            });

        }
    }
}
