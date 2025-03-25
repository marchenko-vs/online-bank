namespace OnlineBank.Repositories
{
    public interface IUserRepository<T>
        where T : class
    {
        public IEnumerable<T> ReadAll();
        public T? Read(int id);
        public T? ReadByEmail(string email);
        public T? ReadById(int id);
        public T Create(T item);
        public T Update(T item);
        public void Delete(int id);
    }
}
