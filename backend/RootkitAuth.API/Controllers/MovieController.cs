//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Net.Http.Headers;
//using RootkitAuth.API.Data;
//using SameSiteMode = Microsoft.AspNetCore.Http.SameSiteMode;

//namespace RootkitAuth.API.Controllers
//{
//    [Route("[controller]")]
//    [ApiController]
//    [Authorize]
//    public class CompetitionController : ControllerBase
//    {
//        private CompetitionDbContext _competitionDbContext;
//        public CompetitionController(CompetitionDbContext temp)
//        {
//            _competitionDbContext = temp;
//        }
//        [HttpGet("GetRootbeers")]
//        public IActionResult GetRootbeers(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? containers = null)
//        {
//            var query = _competitionDbContext.Rootbeers.AsQueryable();

//            if (containers != null && containers.Any())
//            {
//                query = query.Where(c => containers.Contains(c.Container));
//            }

//            var totalNumBrews = query.Count();
//            var brews = query
//                .Skip((pageNum - 1) * pageSize)
//                .Take(pageSize)
//                .ToList();

//            var returnBrews = new
//            {
//                Brews = brews,
//                TotalNumProjects = totalNumBrews
//            };

//            return Ok(returnBrews);
//        }

//        [HttpGet("GetContainerTypes")]
//        public IActionResult GetContainerTypes()
//        {
//            var containerTypes = _competitionDbContext.Rootbeers
//                .Select(c => c.Container)
//                .Distinct()
//                .ToList();

//            return Ok(containerTypes);
//        }
//    }
//}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Evaluation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using RootkitAuth.API.Data;
using RootkitAuth.API.Data.NewDbModels;
using SameSiteMode = Microsoft.AspNetCore.Http.SameSiteMode;

namespace RootkitAuth.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    [Authorize]
    public class MoviesController : ControllerBase
    {
        private MovieDbContext _movieDbContext;

        // Constructor that injects the MovieDbContext
        public MoviesController(MovieDbContext movieDbContext)
        {
            _movieDbContext = movieDbContext;
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
        public IActionResult UpdateMovie(int showId, [FromBody] MoviesTitle updatedMovie)
        {
            var existingMovie = _movieDbContext.MoviesTitles.Find(showId);

            existingMovie.ShowId = updatedMovie.ShowId;
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

            _movieDbContext.MoviesTitles.Update(existingMovie);
            _movieDbContext.SaveChanges();

            return Ok(existingMovie);
        }

        [HttpDelete("DeleteMovie/{showId}")]
        public IActionResult DeleteMovie(int showId)
        {
            var movie = _movieDbContext.MoviesTitles.Find(showId);

            if (movie == null)
            {
                return NotFound(new {message = "Project not found"});

            }

            _movieDbContext.MoviesTitles.Remove(movie);
            _movieDbContext.SaveChanges();

            return NoContent();

        }


        //[HttpGet("GetGenre")]
        //public IActionResult GetBookCategory()
        //{
        //    var bookCategory = _movieDbContext.MoviesTitles
        //        .Select(b => b.Cat)
        //        .Distinct()
        //        .ToList();

        //    return Ok(bookCategory);
        //}
    }
}
