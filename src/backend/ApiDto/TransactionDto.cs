using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace OnlineBank.ApiDto
{
    public class TransactionDto
    {
        [SwaggerSchema(ReadOnly = true)]
        public int Id { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public int CardId { get; set; }
        [Required]
        [DefaultValue("")]
        public required string SenderNumber { get; set; }
        [Required]
        [DefaultValue("")]
        public required string ReceiverNumber { get; set; }
        [Required]
        [DefaultValue(5000.00)]
        public decimal Sum { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public string? Currency { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public DateTime Date { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public string? Status { get; set; }
    }
}
