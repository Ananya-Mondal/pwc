using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace project2.Models
{
    public class User
    {
        [Key]
        [Required(ErrorMessage = "Please enter email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Please enter name")]
        [StringLength(50)]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please enter password"), MaxLength(8)]
        [StringLength(8)]
        public string Password { get; set; }

        [DefaultValue(false)]
        public bool IsAdmin { get; set; }

        [Required(ErrorMessage = "Please enter Address1")]
        public string Address1 { get; set; }
        public string Address2 { get; set; } = string.Empty;
        [Required(ErrorMessage = "Please enter City")]
        public string City { get; set; }
        [Required(ErrorMessage = "Please enter State")]
        public string State { get; set; }
        public string PostalCode { get; set; } = string.Empty;
        [Required(ErrorMessage = "Please enter Country")]
        public string Country { get; set; }

        [Required(ErrorMessage = "Please enter phone")]
        public string Phone { get; set; }

      

    }
}
