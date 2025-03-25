using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineBank.DbLayer
{
    public class CardDb
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public int AccountId { get; set; }
        [Required]
        public required string PaymentSystem { get; set; }
        [Required]
        public required string Number { get; set; }
        [Required]
        public DateTime IssueDate { get; set; }
        [Required]
        public DateTime ValidityDate { get; set; }
        [Required]
        public required string Cvv { get; set; }
        [Required]
        public decimal Balance { get; set; }
        [Required]
        public required string Currency { get; set; }
        [Required]
        public required string Status { get; set; }

        [ForeignKey("AccountId")]
        public required AccountDb Account { get; init; }

        public required List<TransactionDb> Transactions { get; set; } = new();
    }
}
