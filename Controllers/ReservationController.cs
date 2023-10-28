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
                return StatusCode(500, $"An error occured: {e.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReservationById(int id)
        {
            try
            {
                Reservation reservation = await _reservationRepository.GetReservation(id);

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
                return StatusCode(500, $"An error occured: {e.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostReservation(Reservation reservation)
        {
            return Ok(await _reservationRepository.CreateReservation(reservation));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            try
            {
                Reservation reservation = await _reservationRepository.GetReservation(id);

                if (reservation != null)
                {
                    return Ok(await _reservationRepository.DeleteReservation(id));
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

        [HttpPut]
        public async Task<IActionResult> PutReservation(Reservation reservation)
        {
            return Ok(await _reservationRepository.UpdateReservation(reservation));
        }




    }
}
