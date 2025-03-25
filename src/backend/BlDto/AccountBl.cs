namespace OnlineBank.BlLayer
{
    public class AccountBl
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Number { get; set; }
        public DateTime IssueDate { get; set; }
        public decimal Balance { get; set; }
        public string? Currency { get; set; }
        public string? Status { get; set; }
    }
}
