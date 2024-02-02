namespace TeslaRentingApp
{
    public interface IReservationRepository
    {
        Task<List<Reservation>> GetReservations();
        Task<Reservation?> GetReservation(int id);
        Task<List<Reservation>> GetReservationsByUserId(int userId);
        Task<Reservation?> CreateReservation(Reservation reservation);
        Task<List<Reservation>> DeleteReservation(int id);
        Task<Reservation?> UpdateReservation(Reservation reservation);
    }
}
