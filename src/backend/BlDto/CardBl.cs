namespace OnlineBank.DbLayer
{
    public class CardBl
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string? PaymentSystem { get; set; }
        public string? Number { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime ValidityDate { get; set; }
        public string? Cvv { get; set; }
        public decimal Balance { get; set; }
        public string? Currency { get; set; }
        public string? Status { get; set; }
    }
}
