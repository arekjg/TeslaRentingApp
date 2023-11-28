using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace TeslaRentingApp
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Location>()
                .HasData(
                new Location { Id = 1, Name = "Palma Airport" },
                new Location { Id = 2, Name = "Palma City Center" },
                new Location { Id = 3, Name = "Alcudia" },
                new Location { Id = 4, Name = "Manacor" });

            modelBuilder.Entity<Model>()
                .HasData(
                new Model { Id = 1, Name = "Model S Plaid", PricePerDay = (decimal)49.18, ImageName = "model-s-plaid.png", Seats = 5, Capacity = 28, Range = 396 },
                new Model { Id = 2, Name = "Model S", PricePerDay = (decimal)42.18, ImageName = "model-s.png", Seats = 5, Capacity = 28, Range = 405 },
                new Model { Id = 3, Name = "Model 3 Performance", PricePerDay = (decimal)27.55, ImageName = "model-3-performance.png", Seats = 5, Capacity = 23, Range = 315 },
                new Model { Id = 4, Name = "Model 3 Long Range", PricePerDay = (decimal)24.32, ImageName = "model-3-long.png", Seats = 5, Capacity = 23, Range = 333 },
                new Model { Id = 5, Name = "Model 3 Rear-Wheel Drive", PricePerDay = (decimal)22.18, ImageName = "model-3-rear.png", Seats = 5, Capacity = 23, Range = 272 },
                new Model { Id = 6, Name = "Model X Plaid", PricePerDay = (decimal)42.31, ImageName = "model-x-plaid.png", Seats = 6, Capacity = 88, Range = 333 },
                new Model { Id = 7, Name = "Model X", PricePerDay = (decimal)38.78, ImageName = "model-x.png", Seats = 7, Capacity = 88, Range = 348 },
                new Model { Id = 8, Name = "Model Y Performance", PricePerDay = (decimal)29.99, ImageName = "model-y-performance.png", Seats = 5, Capacity = 76, Range = 303 },
                new Model { Id = 9, Name = "Model Y Long Range", PricePerDay = (decimal)26.74, ImageName = "model-y-long.png", Seats = 7, Capacity = 76, Range = 330 },
                new Model { Id = 10, Name = "Model Y Rear-Wheel Drive", PricePerDay = (decimal)23.25, ImageName = "model-y-rear.png", Seats = 5, Capacity = 76, Range = 260 });
        }
    }
}
