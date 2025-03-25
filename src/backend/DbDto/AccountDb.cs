using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineBank.DbLayer
{
    public class AccountDb
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public required string Number { get; set; }
        [Required]
        public DateTime IssueDate { get; set; }
        [Required]
        public decimal Balance { get; set; }
        [Required]
        public required string Currency { get; set; }
        [Required]
        public required string Status { get; set; }

        [ForeignKey("UserId")]
        public required UserDb User { get; init; }

        public required List<CardDb> Cards { get; set; } = new();
    }
}
