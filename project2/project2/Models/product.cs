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
        public string Name { get; set; }
        public int qih { get; set; }
        public double price { get; set; }
        public string Image_Name { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }
    }
}
