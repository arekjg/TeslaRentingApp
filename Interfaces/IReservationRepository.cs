namespace TeslaRentingApp
{
    public interface IReservationRepository
    {
        Task<List<Reservation>> GetReservations();
        Task<Reservation> GetReservation(int id);
        Task<Reservation> CreateReservation(Reservation reservation);
        Task<Reservation> UpdateReservation(Reservation reservation);
        Task<List<Reservation>> DeleteReservation(int id);
    }
}
