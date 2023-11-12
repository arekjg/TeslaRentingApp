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
                return ResponseUtility.InternalServerError(e);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReservationByUuid(int id)
        {
            try
            {
                Reservation? reservation = await _reservationRepository.GetReservation(id);
                return ResponseUtility.OkOrNotFound(reservation);
            }
            catch (Exception e)
            {
                return ResponseUtility.InternalServerError(e);
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
                return ResponseUtility.InternalServerError(e);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            try
            {
                Reservation? reservation = await _reservationRepository.GetReservation(id);
                return ResponseUtility.OkOrNotFound(reservation);
            }
            catch (Exception e)
            {
                return ResponseUtility.InternalServerError(e);
            }
        }
    }
}
