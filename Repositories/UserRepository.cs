using Microsoft.EntityFrameworkCore;

namespace TeslaRentingApp
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<User> GetUser(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<List<User>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
    }
}
