namespace OnlineBank.BlLayer
{
    public class UserBl
    {
        public int Id { get; set; }
        public string? Role { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public string? Patronymic { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Email { get; set; }
        public string? PhoneNum { get; set; }
        public string? Password { get; set; }
        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
        public required string Country { get; set; }
        public required string Region { get; set; }
        public string? City { get; set; }
        public required string AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public required string PostalCode { get; set; }
        public required string IdType { get; set; }
        public string? IdSeries { get; set; }
        public required string IdNumber { get; set; }
        public DateTime IdIssueDate { get; set; }
        public DateTime IdValidityDate { get; set; }
        public required string DepartmentCode { get; set; }
    }
}
