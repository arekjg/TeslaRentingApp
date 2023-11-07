using System.ComponentModel.DataAnnotations.Schema;

namespace TeslaRentingApp
{
    public class User
    {
        [Column("Usr_Id")]
        public int Id { get; set; }
        [Column("Usr_FirstName")]
        public string? FirstName { get; set; }
        [Column("Usr_LastName")]
        public string? LastName { get; set; }
        [Column("Usr_Email")]
        public string? Email { get; set; }
        [Column("Usr_Phone")]
        public string? Phone { get; set; }
    }
}
