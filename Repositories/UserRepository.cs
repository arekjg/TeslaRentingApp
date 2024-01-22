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

        public async Task<User?> GetUserById(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User?> GetUserByLogin(string login)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Login == login);
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

        public async Task<Guid?> GenerateUserToken(SignInUserDto signInUserDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Login == signInUserDto.Login);

            if (user != null && Authenticate(signInUserDto))
            {
                user.Token = Guid.NewGuid();

                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                return user.Token;
            }

            return null;
        }

        public bool Authenticate(SignInUserDto signInUserDto)
        {
            User? user = _context.Users.FirstOrDefault(u => u.Login == signInUserDto.Login);

            if (user == null)
            {
                return false;
            }
            else
            {
                string hashedPsw = Security.HashThePassword(signInUserDto.Password, user.Salt);
                return hashedPsw == user.Password;
            }
        }
    }
}
