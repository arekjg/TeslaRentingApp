using System.ComponentModel.DataAnnotations.Schema;

namespace TeslaRentingApp
{
    public class Model
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("Mod_Id")]
        public int Id { get; set; }
        [Column("Mod_Name")]
        public string? Name { get; set; }
        [Column("Mod_PricePerDay", TypeName = "money")]
        public decimal PricePerDay { get; set; }
        [Column("Mod_Image")]
        public string? ImageName { get; set; }
        [Column("Mod_Seats")]
        public int Seats { get; set; }
        [Column("Mod_Capacity")]
        public int Capacity { get; set; }
        [Column("Mod_Range")]
        public int Range { get; set; }
    }
}
