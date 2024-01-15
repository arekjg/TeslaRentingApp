using System.ComponentModel.DataAnnotations.Schema;

namespace TeslaRentingApp
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
        [Column("Usr_Login")]
        public string? Login { get; set; }
        [Column("Usr_Password")]
        public string? Password { get; set; }
        [Column("Usr_Salt")]
        public byte[]? Salt { get; set; }
    }
}
