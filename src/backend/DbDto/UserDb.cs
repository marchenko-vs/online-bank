using System.ComponentModel.DataAnnotations;

namespace OnlineBank.DbLayer
{
    public class UserDb
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public required string Role { get; set; }
        [Required]
        public required string FirstName { get; set; }
        [Required]
        public required string LastName { get; set; }
        public string? Patronymic { get; set; }
        [Required]
        public DateTime BirthDate { get; set; }
        [Required]
        public required string Email { get; set; }
        public string? PhoneNum { get; set; }
        [Required]
        public required string Salt { get; set; }
        [Required]
        public required string HashedPassword { get; set; }
        [Required]
        public required string Country { get; set; }
        [Required]
        public required string Region { get; set; }
        public string? City { get; set; }
        [Required]
        public required string AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        [Required]
        public required string PostalCode { get; set; }
        [Required]
        public required string IdType { get; set; }
        public string? IdSeries { get; set; }
        [Required]
        public required string IdNumber { get; set; }
        [Required]
        public DateTime IdIssueDate { get; set; }
        [Required]
        public DateTime IdValidityDate { get; set; }
        [Required]
        public required string DepartmentCode { get; set; }

        public required List<AccountDb> Accounts { get; set; } = new();
    }
}
