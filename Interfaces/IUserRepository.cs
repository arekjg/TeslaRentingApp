using TeslaRentingApp.DTOs;

namespace TeslaRentingApp
{
    public interface IUserRepository
    {
        Task<User?> GetUser(int id);
        Task<User?> CreateRegisteredUser(AddRegisteredUserDto userDto);
        Task<User?> CreateUnregisteredUser(AddUnregisteredUserDto userDto);
    }
}
 