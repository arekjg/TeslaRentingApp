using System.ComponentModel.DataAnnotations.Schema;

namespace TeslaRentingApp
{
    public class Location
    {
        [Column("Loc_Id")]
        public int Id { get; set; }
        [Column("Loc_Name")]
        public string? Name { get; set; }
    }
}
