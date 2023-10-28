namespace TeslaRentingApp
{
    public interface IUserRepository
    {
        Task<User> CreateUser(User user);
    }
}
