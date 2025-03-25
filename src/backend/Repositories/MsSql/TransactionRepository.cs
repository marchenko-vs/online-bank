using OnlineBank.Data;
using OnlineBank.DbLayer;

namespace OnlineBank.Repositories
{
    public class TransactionRepository : ITransactionRepository<TransactionDb>
    {
        private readonly AppDbContext _context;

        public TransactionRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<TransactionDb> ReadAll()
        {
            return _context.Transactions.ToList();
        }

        public TransactionDb? Read(int id)
        {
            return _context.Transactions.Find(id);
        }

        public TransactionDb Create(TransactionDb item)
        {
            _context.Transactions.Add(item);
            _context.SaveChanges();

            return item;
        }

        public TransactionDb Update(TransactionDb item)
        {
            _context.Transactions.Update(item);
            _context.SaveChanges();

            return item;
        }

        public void Delete(int id)
        {
            TransactionDb? item = _context.Transactions.Find(id);

            if (null != item)
            {
                _context.Transactions.Remove(item);
                _context.SaveChanges();
            }
        }
    }
}
