using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Swashbuckle.AspNetCore.Annotations;

namespace OnlineBank.ApiDto
{
    public class UserDtoGet
    {
        public int Id { get; set; }
        public string? Role { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Patronymic { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Email { get; set; }
        public string? PhoneNum { get; set; }
        public string? Country { get; set; }
        public string? Region { get; set; }
        public string? City { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? PostalCode { get; set; }
        public string? IdType { get; set; }
        public string? IdSeries { get; set; }
        public string? IdNumber { get; set; }
        public DateTime IdIssueDate { get; set; }
        public DateTime IdValidityDate { get; set; }
        public string? DepartmentCode { get; set; }
    }

    public class UserDtoPost
    {
        [Required]
        [DefaultValue("Полина")]
        public required string FirstName { get; set; }
        [Required]
        [DefaultValue("Дыхал")]
        public required string LastName { get; set; }
        [DefaultValue(null)]
        public string? Patronymic { get; set; }
        [Required]
        [DefaultValue("2002-08-01T00:00:00.000Z")]
        public required DateTime BirthDate { get; set; }
        [Required]
        [DefaultValue("dykhal@mail.ru")]
        public required string Email { get; set; }
        [DefaultValue(null)]
        public string? PhoneNum { get; set; }
        [Required]
        [DefaultValue("123456")]
        public required string Password { get; set; }
        [Required]
        [DefaultValue("Российская Федерация")]
        public required string Country { get; set; }
        [Required]
        [DefaultValue("Московская область")]
        public required string Region { get; set; }
        [DefaultValue(null)]
        public string? City { get; set; }
        [Required]
        [DefaultValue("ул. Бауманская, д. 2, кв. 1")]
        public required string AddressLine1 { get; set; }
        [DefaultValue(null)]
        public string? AddressLine2 { get; set; }
        [Required]
        [DefaultValue("156723")]
        public required string PostalCode { get; set; }
        [Required]
        [DefaultValue("Паспорт гражданина РФ")]
        public required string IdType { get; set; }
        [DefaultValue(null)]
        public string? IdSeries { get; set; }
        [Required]
        [DefaultValue("123456")]
        public required string IdNumber { get; set; }
        [Required]
        [DefaultValue("2018-05-25T00:00:00.000Z")]
        public DateTime IdIssueDate { get; set; }
        [Required]
        [DefaultValue("3000-01-01T00:00:00.000Z")]
        public DateTime IdValidityDate { get; set; }
        [Required]
        [DefaultValue("123-456")]
        public required string DepartmentCode { get; set; }
    }

    public class UserDtoLogin
    {
        [Required]
        [DefaultValue("dykhal@mail.ru")]
        public required string Email { get; set; }
        [Required]
        [DefaultValue("123456")]
        public required string Password { get; set; }
    }

    public class UserDtoPatch
    {
        [SwaggerSchema(ReadOnly = true)]
        public int Id { get; set; }
        [DefaultValue(null)]
        public string? FirstName { get; set; }
        [DefaultValue(null)]
        public string? LastName { get; set; }
        [DefaultValue("Романовна")]
        public string? Patronymic { get; set; }
        [DefaultValue("3000-01-01T00:00:00.000Z")]
        public DateTime BirthDate { get; set; }
        [DefaultValue(null)]
        public string? Email { get; set; }
        [DefaultValue("+79998887766")]
        public string? PhoneNum { get; set; }
        [DefaultValue("123456")]
        public string? OldPassword { get; set; }
        [DefaultValue(null)]
        public string? NewPassword { get; set; }
        [DefaultValue(null)]
        public string? Country { get; set; }
        [DefaultValue(null)]
        public string? Region { get; set; }
        [DefaultValue("Москва")]
        public string? City { get; set; }
        [DefaultValue(null)]
        public string? AddressLine1 { get; set; }
        [DefaultValue("корп. 1")]
        public string? AddressLine2 { get; set; }
        [DefaultValue(null)]
        public string? PostalCode { get; set; }
        [DefaultValue(null)]
        public string? IdType { get; set; }
        [DefaultValue("1234")]
        public string? IdSeries { get; set; }
        [DefaultValue(null)]
        public string? IdNumber { get; set; }
        [DefaultValue("3000-01-01T00:00:00.000Z")]
        public DateTime IdIssueDate { get; set; }
        [DefaultValue("2030-01-01T00:00:00.000Z")]
        public DateTime IdValidityDate { get; set; }
        [DefaultValue(null)]
        public string? DepartmentCode { get; set; }
    }
}
