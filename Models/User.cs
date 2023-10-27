using System.ComponentModel.DataAnnotations.Schema;

namespace TeslaRentingApp
{
    public class User
    {
        [Column("Usr_Id")]
        public int Id { get; set; }
        [Column("Usr_Name")]
        public string Name { get; set; }
    }
}
