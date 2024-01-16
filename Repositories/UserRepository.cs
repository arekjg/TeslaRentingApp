using Microsoft.EntityFrameworkCore;
using TeslaRentingApp.DTOs;
using TeslaRentingApp.Helpers;

namespace TeslaRentingApp
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<User?> GetUser(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User?> CreateRegisteredUser(AddRegisteredUserDto userDto)
        {
            if (userDto.Password == null)
            {
                return null;
            }

            byte[] salt = Security.CreateSalt();
            string hashedPassword = Security.HashThePassword(userDto.Password, salt);

            User user = new()
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Email = userDto.Email,
                Phone = userDto.Phone,
                Login = userDto.Login,
                Password = hashedPassword,
                Salt = salt
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return await _context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
        }

        public async Task<User?> CreateUnregisteredUser(AddUnregisteredUserDto userDto)
        {
            User user = new()
            {
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                Email = userDto.Email,
                Phone = userDto.Phone
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return await _context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
        }
    }
}
