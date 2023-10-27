namespace TeslaRentingApp
{
    public interface IUserRepository
    {
        Task<List<User>> GetUsers();
        Task<User> GetUser(int id);
    }
}
