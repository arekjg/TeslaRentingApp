using System.ComponentModel.DataAnnotations.Schema;

namespace TeslaRentingApp
{
    public class Location
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Loc_Id")]
        public int Id { get; set; }
        [Column("Loc_Name")]
        public string? Name { get; set; }
    }
}
