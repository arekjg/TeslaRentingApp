using System.ComponentModel.DataAnnotations.Schema;

namespace TeslaRentingApp.DTOs
{
    public class AddUnregisteredUserDto
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
    }
}
