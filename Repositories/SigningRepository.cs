namespace TeslaRentingApp
{
    public class SigningRepository : ISigningRepository
    {
        private readonly DataContext _context;

        public SigningRepository(DataContext context)
        {
            _context = context;
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

            getUserDto.Id = user.Id;
            getUserDto.FirstName = user.FirstName;
            getUserDto.LastName = user.LastName;
            getUserDto.Email = user.Email;
            getUserDto.Phone = user.Phone;
            getUserDto.Login = user.Login;
            getUserDto.Token = user.Token;

            return new SigningStatus() { GetUserDto = getUserDto };
        }

        public async Task<SigningStatus> Logout(SignOutDto signOutDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Login == signOutDto.Login && u.Token == signOutDto.Token);
            var getUserDto = new GetUserDto();

            if (user == null)
            {
                return new SigningStatus() { Message = "User not found" };
            }

            user.Token = null;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            getUserDto.Id = user.Id;
            getUserDto.FirstName = user.FirstName;
            getUserDto.LastName = user.LastName;
            getUserDto.Email = user.Email;
            getUserDto.Phone = user.Phone;
            getUserDto.Login = user.Login;
            getUserDto.Token = user.Token;

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
    }
}
