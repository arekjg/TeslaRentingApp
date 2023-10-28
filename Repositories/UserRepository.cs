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

        public async Task<User> CreateUser(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return await _context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
        }
    }
}
