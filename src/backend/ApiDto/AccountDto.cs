using System.ComponentModel;
using Swashbuckle.AspNetCore.Annotations;

namespace OnlineBank.ApiDto
{
    public class AccountDtoGet
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Number { get; set; }
        public DateTime IssueDate { get; set; }
        public decimal Balance { get; set; }
        public string? Currency { get; set; }
        public string? Status { get; set; }
    }

    public class AccountDtoPost
    {
        [SwaggerSchema(ReadOnly = true)]
        public int UserId { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public string? Number { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public DateTime IssueDate { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public decimal Balance { get; set; }
        [DefaultValue("RUB")]
        public string? Currency { get; set; }
        [SwaggerSchema(ReadOnly = true)]
        public string? Status { get; set; }
    }
}
