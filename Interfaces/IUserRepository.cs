namespace TeslaRentingApp
{
    public interface IUserRepository
    {
        Task<GetUserDto?> GetUserById(int id);
        Task<GetUserDto?> GetUserByLogin(string login);
        Task<SigningStatus> CreateRegisteredUser(AddRegisteredUserDto userDto);
        Task<GetUserDto?> CreateUnregisteredUser(AddUnregisteredUserDto userDto);
        Task<GetUserDto?> UpdateUser(UpdateUserDto updatedUserDto);
    }
}
