using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace project2.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string u_id { get; set; }
        public DateTime Order_Date { get; set; } = DateTime.Now;
        [Required]
        public decimal Order_Amount { get; set; } = 0;
        


    }
}
