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

        public async Task<GetUserDto?> GetUserById(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            var getUserDto = new GetUserDto();

            if (user != null)
            {
                getUserDto.Id = user.Id;
                getUserDto.FirstName = user.FirstName;
                getUserDto.LastName = user.LastName;
                getUserDto.Email = user.Email;
                getUserDto.Phone = user.Phone;
                getUserDto.Login = user.Login;
                getUserDto.Token = user.Token;
            }

            return getUserDto;
        }

        public async Task<GetUserDto?> GetUserByLogin(string login)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Login == login);
            var getUserDto = new GetUserDto();

            if (user != null)
            {
                getUserDto.Id = user.Id;
                getUserDto.FirstName = user.FirstName;
                getUserDto.LastName = user.LastName;
                getUserDto.Email = user.Email;
                getUserDto.Phone = user.Phone;
                getUserDto.Login = user.Login;
                getUserDto.Token = user.Token;
            }

            return getUserDto;
        }

        public async Task<SigningStatus> CreateRegisteredUser(AddRegisteredUserDto userDto)
        {
            if (userDto.Password == null)
            {
                return new SigningStatus() { Message = "You must enter a password" };
            }

            if (LoginExists(userDto))
            {
                return new SigningStatus() { Message = "Login already exists" };
            }

            if (EmailExists(userDto))
            {
                return new SigningStatus() { Message = "There is already an account with this email" };
            }

            byte[] salt = Security.CreateSalt();
            string hashedPassword = Security.HashThePassword(userDto.Password, salt);

            var user = new User()
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

            var getUserDto = new GetUserDto()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Phone = user.Phone,
                Login = user.Login,
                Token = user.Token
            };

            return new SigningStatus() { GetUserDto = getUserDto };
        }

        public async Task<GetUserDto?> CreateUnregisteredUser(AddUnregisteredUserDto userDto)
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

            var getUserDto = new GetUserDto()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Phone = user.Phone
            };

            return getUserDto;
        }

        public async Task<SigningStatus> GetAuthenticatedUser(SignInDto signInUserDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Login == signInUserDto.Login);
            var getUserDto = new GetUserDto();

            if (!AuthenticateUser(signInUserDto))
            {
                return new SigningStatus() { Message = "Your login and/or password is incorrect" };
            }

            if (user == null)
            {
                return new SigningStatus() { Message = "User not found" };
            }

            user.Token = Guid.NewGuid();

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            getUserDto = new GetUserDto()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Phone = user.Phone,
                Login = user.Login,
                Token = user.Token
            };

            return new SigningStatus() { GetUserDto = getUserDto };
        }

        public bool AuthenticateUser(SignInDto signInUserDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Login == signInUserDto.Login);

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

        public bool LoginExists(AddRegisteredUserDto userDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Login == userDto.Login && u.Login != null);
            return !(user == null);
        }

        public bool EmailExists(AddRegisteredUserDto userDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == userDto.Email && u.Login != null);
            return !(user == null);
        }
    }
}
