namespace TeslaRentingApp
{
    public interface IUserRepository
    {
        Task<User?> GetUserById(int id);
        Task<User?> GetUserByLogin(string login);
        Task<User?> CreateRegisteredUser(AddRegisteredUserDto userDto);
        Task<User?> CreateUnregisteredUser(AddUnregisteredUserDto userDto);
        Task<Guid?> GenerateUserToken(SignInUserDto signInUserDto);
    }
}
