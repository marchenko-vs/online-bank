using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineBank.DbLayer
{
    public class TransactionDb
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public int CardId { get; set; }
        [Required]
        public required string SenderNumber { get; set; }
        [Required]
        public required string ReceiverNumber { get; set; }
        [Required]
        public decimal Sum { get; set; }
        [Required]
        public required string Currency { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public required string Status { get; set; }

        [ForeignKey("CardId")]
        public required CardDb Card { get; init; }
    }
}

