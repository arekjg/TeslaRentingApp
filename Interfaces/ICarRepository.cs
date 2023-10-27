namespace TeslaRentingApp
{
    public interface ICarRepository
    {
        Task<List<Car>> GetCars();
        Task<Car> GetCar(int id);
    }
}
