namespace OnlineBank.DbLayer
{
    public class TransactionBl
    {
        public int Id { get; set; }
        public int CardId { get; set; }
        public string? SenderNumber { get; set; }
        public string? ReceiverNumber { get; set; }
        public decimal Sum { get; set; }
        public string? Currency { get; set; }
        public DateTime Date { get; set; }
        public string? Status { get; set; }
    }
}
