using System.ComponentModel.DataAnnotations.Schema;

namespace TeslaRentingApp
{
    public class Model
    {
        [Column("Mod_Id")]
        public int Id { get; set; }
        [Column("Mod_Name")]
        public string Name { get; set; }
        [Column("Mod_PricePerDay")]
        public decimal PricePerDay { get; set; }
        [Column("Mod_Image")]
        public string ImageName { get; set; }
    }
}
