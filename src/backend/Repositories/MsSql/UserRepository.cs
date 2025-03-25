using OnlineBank.Data;
using OnlineBank.DbLayer;

namespace OnlineBank.Repositories
{
    public class UserRepository : IUserRepository<UserDb>
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<UserDb> ReadAll()
        {
            return _context.Users.ToList();
        }

        public UserDb? Read(int id)
        {
            return _context.Users.Find(id);
        }

        public UserDb? ReadByEmail(string email)
        {
            return _context.Users.FirstOrDefault(p => p.Email == email);
        }

        public UserDb? ReadById(int id)
        {
            return _context.Users.FirstOrDefault(p => p.Id == id);
        }

        public UserDb Create(UserDb item)
        {
            _context.Users.Add(item);
            _context.SaveChanges();

            return item;
        }

        public UserDb Update(UserDb item)
        {
            _context.Users.Update(item);
            _context.SaveChanges();

            return item;
        }

        public void Delete(int id)
        {
            UserDb? item = _context.Users.Find(id);

            if (null != item)
            {
                _context.Users.Remove(item);
                _context.SaveChanges();
            }
        }
    }
}
