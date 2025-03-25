namespace OnlineBank.Repositories
{
    public interface ICardRepository<T>
        where T : class
    {
        public IEnumerable<T> ReadAll();
        public T? Read(int id);
        public IEnumerable<T> ReadByAccountId(int accountId);
        public T? ReadByNumber(string number);
        public T Create(T item);
        public T Update(T item);
        public void Delete(int id);
    }
}
