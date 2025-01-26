using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.InteropServices;

namespace project2.Models
{
    public class product
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required(ErrorMessage = "Please enter name")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Please enter Quantity")]
        public int qih { get; set; }
        [Required(ErrorMessage = "Please enter Price")]
        public double price { get; set; }
        [Required(ErrorMessage = "Please select Image")]
        public string Image_Name { get; set; }
        [Required(ErrorMessage = "Please enter Description")]
        public string Description { get; set; }
        [Required(ErrorMessage = "Please enter Category")]
        public string Category { get; set; }

        public string CreatedBy { get; set; }
    }
}
