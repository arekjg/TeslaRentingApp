namespace TeslaRentingApp
{
    public interface IUserRepository
    {
        Task<User> GetUser(int id);
        Task<User> CreateUser(User user);
    }
}
