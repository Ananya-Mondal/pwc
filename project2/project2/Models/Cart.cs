using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project2.Models
{
    public class Cart

    { 
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]   
        public int Id { get; set; }
        [Required]
        public int p_id { get; set; }
        [Required]
        public string p_name { get; set; }
        [Required]
        public double p_price { get; set; }
        [Required]
        public string u_id { get; set; }
        [Required]
        public int Qty { get; set; }

    }
}
