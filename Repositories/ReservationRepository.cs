using Microsoft.EntityFrameworkCore;

namespace TeslaRentingApp
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly DataContext _context;

        public ReservationRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Reservation?> CreateReservation(Reservation reservation)
        {
            await _context.Reservations.AddAsync(reservation);
            await _context.SaveChangesAsync();

            return await _context.Reservations.FirstOrDefaultAsync(r => r.Id == reservation.Id);
        }

        public async Task<List<Reservation>> DeleteReservation(int id)
        {
            Reservation? reservation = await _context.Reservations.FirstOrDefaultAsync(r => r.Id == id);
            
            if (reservation != null)
            {
                _context.Reservations.Remove(reservation);
                await _context.SaveChangesAsync();
            }

            return await _context.Reservations.ToListAsync();
        }

        public async Task<Reservation?> GetReservation(int id)
        {
            return await _context.Reservations.FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<List<Reservation>> GetReservations()
        {
            return await _context.Reservations.ToListAsync();
        }

        public async Task<Reservation?> UpdateReservation(Reservation updatedReservation)
        {
            var reservation = _context.Reservations.FirstOrDefault(r => r.Id == updatedReservation.Id);

            if (reservation != null)
            {
                reservation.CarId = updatedReservation.CarId;
                reservation.DateStart = updatedReservation.DateStart;
                reservation.DateEnd = updatedReservation.DateEnd;
                reservation.LocIdStart = updatedReservation.LocIdStart;
                reservation.LocIdEnd = updatedReservation.LocIdEnd;
                reservation.Cost = updatedReservation.Cost;

                _context.Reservations.Update(reservation);
                await _context.SaveChangesAsync();
            }
            return reservation;
        }
    }
}
