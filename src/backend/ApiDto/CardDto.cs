using System.ComponentModel;
using Swashbuckle.AspNetCore.Annotations;

namespace OnlineBank.ApiDto
{
    public class CardDto
    {
        [SwaggerSchema(ReadOnly = true)]
        public int Id { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public int AccountId { get; set; }
        [DefaultValue("VISA")]
        public string? PaymentSystem { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public string? Number { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public DateTime IssueDate { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public DateTime ValidityDate { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public string? Cvv { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public decimal Balance { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public string? Currency { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public string? Status { get; set; }
    }
}
