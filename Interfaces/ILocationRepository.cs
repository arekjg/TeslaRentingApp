namespace TeslaRentingApp
{
    public interface ILocationRepository
    {
        Task<List<Location>> GetLocations();
        Task<Location?> GetLocation(int id);
    }
}
