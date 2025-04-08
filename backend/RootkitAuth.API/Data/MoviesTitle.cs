using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace RootkitAuth.API.Data;

[Keyless]
[Table("movies_titles")]
public partial class MoviesTitle
{
    [Column("show_id")]
    public string? ShowId { get; set; }

    //[Column("genre")]
    //public string? Genres { get; set; }


    [Column("type")]
    public string? Type { get; set; }

    [Column("title")]
    public string? Title { get; set; }

    [Column("director")]
    public string? Director { get; set; }

    [Column("cast")]
    public string? Cast { get; set; }

    [Column("country")]
    public string? Country { get; set; }

    [Column("release_year")]
    public int? ReleaseYear { get; set; }

    [Column("rating")]
    public string? Rating { get; set; }

    [Column("duration")]
    public string? Duration { get; set; }

    [Column("description")]
    public string? Description { get; set; }

    public int? Action { get; set; }

    public int? Adventure { get; set; }

    [Column("Anime Series International TV Shows")]
    public int? AnimeSeriesInternationalTvShows { get; set; }

    [Column("British TV Shows Docuseries International TV Shows")]
    public int? BritishTvShowsDocuseriesInternationalTvShows { get; set; }

    public int? Children { get; set; }

    public int? Comedies { get; set; }

    [Column("Comedies Dramas International Movies")]
    public int? ComediesDramasInternationalMovies { get; set; }

    [Column("Comedies International Movies")]
    public int? ComediesInternationalMovies { get; set; }

    [Column("Comedies Romantic Movies")]
    public int? ComediesRomanticMovies { get; set; }

    [Column("Crime TV Shows Docuseries")]
    public int? CrimeTvShowsDocuseries { get; set; }

    public int? Documentaries { get; set; }

    [Column("Documentaries International Movies")]
    public int? DocumentariesInternationalMovies { get; set; }

    public int? Docuseries { get; set; }

    public int? Dramas { get; set; }

    [Column("Dramas International Movies")]
    public int? DramasInternationalMovies { get; set; }

    [Column("Dramas Romantic Movies")]
    public int? DramasRomanticMovies { get; set; }

    [Column("Family Movies")]
    public int? FamilyMovies { get; set; }

    public int? Fantasy { get; set; }

    [Column("Horror Movies")]
    public int? HorrorMovies { get; set; }

    [Column("International Movies Thrillers")]
    public int? InternationalMoviesThrillers { get; set; }

    [Column("International TV Shows Romantic TV Shows TV Dramas")]
    public int? InternationalTvShowsRomanticTvShowsTvDramas { get; set; }

    [Column("Kids' TV")]
    public int? KidsTv { get; set; }

    [Column("Language TV Shows")]
    public int? LanguageTvShows { get; set; }

    public int? Musicals { get; set; }

    [Column("Nature TV")]
    public int? NatureTv { get; set; }

    [Column("Reality TV")]
    public int? RealityTv { get; set; }

    public int? Spirituality { get; set; }

    [Column("TV Action")]
    public int? TvAction { get; set; }

    [Column("TV Comedies")]
    public int? TvComedies { get; set; }

    [Column("TV Dramas")]
    public int? TvDramas { get; set; }

    [Column("Talk Shows TV Comedies")]
    public int? TalkShowsTvComedies { get; set; }

    public int? Thrillers { get; set; }

    //public string GetGenres()
    //{
    //    List<string> genres = new List<string>();

    //    // Check each genre and add it if the corresponding value is 1
    //    if (Action == 1) genres.Add("Action");
    //    if (Adventure == 1) genres.Add("Adventure");
    //    if (Comedies == 1) genres.Add("Comedy");
    //    if (Documentaries == 1) genres.Add("Documentary");
    //    if (Dramas == 1) genres.Add("Drama");
    //    if (FamilyMovies == 1) genres.Add("Family");
    //    if (Fantasy == 1) genres.Add("Fantasy");
    //    if (HorrorMovies == 1) genres.Add("Horror");
    //    if (Thrillers == 1) genres.Add("Thriller");
    //    if (AnimeSeriesInternationalTvShows == 1) genres.Add("Anime Series / International TV Shows");
    //    if (BritishTvShowsDocuseriesInternationalTvShows == 1) genres.Add("British TV Shows / Docuseries / International TV Shows");
    //    if (Children == 1) genres.Add("Children");
    //    if (ComediesDramasInternationalMovies == 1) genres.Add("Comedies / Dramas / International Movies");
    //    if (ComediesInternationalMovies == 1) genres.Add("Comedies / International Movies");
    //    if (ComediesRomanticMovies == 1) genres.Add("Comedies / Romantic Movies");
    //    if (CrimeTvShowsDocuseries == 1) genres.Add("Crime TV Shows / Docuseries");
    //    if (DocumentariesInternationalMovies == 1) genres.Add("Documentaries / International Movies");
    //    if (Docuseries == 1) genres.Add("Docuseries");
    //    if (DramasInternationalMovies == 1) genres.Add("Dramas / International Movies");
    //    if (DramasRomanticMovies == 1) genres.Add("Dramas / Romantic Movies");
    //    if (InternationalMoviesThrillers == 1) genres.Add("International Movies / Thrillers");
    //    if (InternationalTvShowsRomanticTvShowsTvDramas == 1) genres.Add("International TV Shows / Romantic TV Shows / TV Dramas");
    //    if (KidsTv == 1) genres.Add("Kids TV");
    //    if (LanguageTvShows == 1) genres.Add("Language TV Shows");
    //    if (Musicals == 1) genres.Add("Musicals");
    //    if (NatureTv == 1) genres.Add("Nature TV");
    //    if (RealityTv == 1) genres.Add("Reality TV");
    //    if (Spirituality == 1) genres.Add("Spirituality");
    //    if (TvAction == 1) genres.Add("TV Action");
    //    if (TvComedies == 1) genres.Add("TV Comedies");
    //    if (TvDramas == 1) genres.Add("TV Dramas");
    //    if (TalkShowsTvComedies == 1) genres.Add("Talk Shows / TV Comedies");

    //    // Return a comma-separated list of genres
    //    return string.Join(", ", genres);
    //}
}
