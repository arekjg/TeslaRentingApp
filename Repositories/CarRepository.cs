using Microsoft.EntityFrameworkCore;

namespace TeslaRentingApp
{
    public class CarRepository : ICarRepository
    {
        private readonly DataContext _context;

        public CarRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Car> GetCar(int id)
        {
            return await (from c in _context.Cars
                          join m in _context.Models
                          on c.ModelId equals m.Id
                          where c.Id == id
                          select new Car()
                          {
                              Id = c.Id,
                              ModelId = c.ModelId,
                              RegistrationNo = c.RegistrationNo,
                              ModelName = m.Name,
                              PricePerDay = m.PricePerDay
                          }).FirstOrDefaultAsync();
        }

        public async Task<List<Car>> GetCars()
        {
            return await (from c in _context.Cars
                          join m in _context.Models
                          on c.ModelId equals m.Id
                          select new Car()
                          {
                              Id = c.Id,
                              ModelId = c.ModelId,
                              RegistrationNo = c.RegistrationNo,
                              ModelName = m.Name,
                              PricePerDay = m.PricePerDay
                          }).ToListAsync();
        }
    }
}
