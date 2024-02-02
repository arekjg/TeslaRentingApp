using System.ComponentModel.DataAnnotations.Schema;

namespace TeslaRentingApp
{
    public class Reservation
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Res_Id")]
        public int Id { get; set; }
        [Column("Res_CarId")]
        public int CarId { get; set; }
        [Column("Res_UserId")]
        public int UserId { get; set; }
        [Column("Res_DateStart")]
        public int DateStart { get; set; }
        [Column("Res_DateEnd")]
        public int DateEnd { get; set; }
        [Column("Res_LocIdStart")]
        public int StartLocationId { get; set; }
        [Column("Res_LocIdEnd")]
        public int EndLocationId { get; set; }
        [Column("Res_Cost", TypeName = "money")]
        public decimal Cost { get; set; }

        public Model? Car { get; set; }
        public Location? StartLocation { get; set; }
        public Location? EndLocation { get; set; }
    }
}
