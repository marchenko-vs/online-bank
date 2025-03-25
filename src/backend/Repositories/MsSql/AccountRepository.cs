using DevExpress.Data.ODataLinq.Helpers;
using OnlineBank.Data;
using OnlineBank.DbLayer;

namespace OnlineBank.Repositories
{
    public class AccountRepository : IAccountRepository<AccountDb>
    {
        private readonly AppDbContext _context;

        public AccountRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<AccountDb> ReadAll()
        {
            return _context.Accounts.ToList();
        }

        public AccountDb? Read(int id)
        {
            return _context.Accounts.Find(id);
        }

        public IEnumerable<AccountDb> ReadByUserId(int userId)
        {
            return _context.Accounts.Where(p => p.UserId == userId).ToList();
        }

        public AccountDb Create(AccountDb item)
        {
            _context.Accounts.Add(item);
            _context.SaveChanges();

            return item;
        }

        public AccountDb Update(AccountDb item)
        {
            _context.Accounts.Update(item);
            _context.SaveChanges();

            return item;
        }

        public void Delete(int id)
        {
            AccountDb? item = _context.Accounts.Find(id);

            if (null != item)
            {
                _context.Accounts.Remove(item);
                _context.SaveChanges();
            }
        }
    }
}
