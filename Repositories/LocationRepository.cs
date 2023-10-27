using Microsoft.EntityFrameworkCore;

namespace TeslaRentingApp
{
    public class LocationRepository : ILocationRepository
    {
        private readonly DataContext _context;

        public LocationRepository(DataContext context)
        { 
            _context = context;
        }

        public async Task<Location> GetLocation(int id)
        {
            return await _context.Locations.FirstOrDefaultAsync(l => l.Id == id);
        }

        public async Task<List<Location>> GetLocations()
        {
            return await _context.Locations.ToListAsync();
        }
    }
}
