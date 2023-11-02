using Microsoft.AspNetCore.Mvc;

namespace TeslaRentingApp
{
    [ApiController]
    [Route("api/reservations")]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationRepository _reservationRepository;
        public ReservationController(IReservationRepository reservationRepository)
        {
            _reservationRepository = reservationRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllReservations()
        {
            try
            {
                List<Reservation> reservations = await _reservationRepository.GetReservations();
                return Ok(reservations);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occured: {e.Message}");
            }
        }

        [HttpGet("{uuid}")]
        public async Task<IActionResult> GetReservationByUuid(string uuid)
        {
            try
            {
                Reservation reservation = await _reservationRepository.GetReservation(uuid);

                if (reservation != null)
                {
                    return Ok(reservation);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occured: {e.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostReservation(Reservation reservation)
        {
            try
            {
                return Ok(await _reservationRepository.CreateReservation(reservation));
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occured: {e.Message}");
            }
        }

        [HttpDelete("{uuid}")]
        public async Task<IActionResult> DeleteReservation(string uuid)
        {
            try
            {
                Reservation reservation = await _reservationRepository.GetReservation(uuid);

                if (reservation != null)
                {
                    return Ok(await _reservationRepository.DeleteReservation(uuid));
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"An error occured: {e.Message}");
            }
        }
    }
}
