namespace OnlineBank.Repositories
{
    public interface IAccountRepository<T>
        where T : class
    {
        public IEnumerable<T> ReadAll();
        public T? Read(int id);
        public IEnumerable<T> ReadByUserId(int userId);
        public T Create(T item);
        public T Update(T item);
        public void Delete(int id);
    }
}
