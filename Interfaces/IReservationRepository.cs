namespace TeslaRentingApp
{
    public interface IReservationRepository
    {
        Task<List<Reservation>> GetReservations();
        Task<Reservation?> GetReservation(string uuid);
        Task<Reservation?> CreateReservation(Reservation reservation);
        Task<List<Reservation>> DeleteReservation(string uuid);
    }
}
