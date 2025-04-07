﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace RootkitAuth.API.Data;

public partial class MovieDbContext : DbContext
{
    public MovieDbContext()
    {
    }

    public MovieDbContext(DbContextOptions<MovieDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<MoviesRating> MoviesRatings { get; set; }

    public virtual DbSet<MoviesTitle> MoviesTitles { get; set; }

    public virtual DbSet<MoviesUser> MoviesUsers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlite("Data Source=C:\\Users\\adams\\testINTEX\\IntexProj3.14\\backend\\RootkitAuth.API\\Movies.db");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
