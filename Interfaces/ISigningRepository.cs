namespace TeslaRentingApp
{
    public interface ISigningRepository
    {
        Task<SigningStatus> GetAuthenticatedUser(SignInDto signInUserDto);
        Task<SigningStatus> Logout(SignOutDto signOutDto);
    }
}
