using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace project2.Models
{
    public class OrderDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int Ord_Id { get; set; }
        [Required]
        public int p_id { get; set; }
        [Required]
        public int Qty { get; set; }


    }
}
