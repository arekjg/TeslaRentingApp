using System.ComponentModel.DataAnnotations.Schema;

namespace TeslaRentingApp
{
    public class Car
    {
        [Column("Car_Id")]
        public int Id { get; set; }
        [Column("Car_ModelId")]
        public int ModelId { get; set; }
        [Column("Car_RegistrationNo")]
        public string RegistrationNo { get; set; }
        public string ModelName { get; set; }
        public decimal PricePerDay { get; set; }
    }
}
