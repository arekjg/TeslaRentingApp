using Microsoft.AspNetCore.Mvc;

namespace TeslaRentingApp.Controllers
{
    [ApiController]
    [Route("api/cars")]
    public class CarController : ControllerBase
    {
        private readonly ICarRepository _carRepository;

        public CarController(ICarRepository carRepository)
        {
            _carRepository = carRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCars()
        {
            try
            {
                List<Car> cars = await _carRepository.GetCars();
                return Ok(cars);
            }
            catch (Exception e)
            {
                return StatusCode(500, $"An error occured: {e.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCarById(int id)
        {
            try
            {
                Car car = await _carRepository.GetCar(id);

                if (car != null)
                {
                    return Ok(car);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, $"An error occured: {e.Message}");
            }
        }
    }
}
