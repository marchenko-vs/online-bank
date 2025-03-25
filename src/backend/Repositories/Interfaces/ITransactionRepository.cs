namespace OnlineBank.Repositories
{
    public interface ITransactionRepository<T>
        where T : class
    {
        public IEnumerable<T> ReadAll();
        public T? Read(int id);
        public T Create(T item);
        public T Update(T item);
        public void Delete(int id);
    }
}
