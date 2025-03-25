namespace OnlineBank.Identity
{
    public class TokenRequest
    {
        public int Id { get; set; }
        public required string Role { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
