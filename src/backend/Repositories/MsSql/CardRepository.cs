using OnlineBank.Data;
using OnlineBank.DbLayer;

namespace OnlineBank.Repositories
{
    public class CardRepository : ICardRepository<CardDb>
    {
        private readonly AppDbContext _context;

        public CardRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<CardDb> ReadAll()
        {
            return _context.Cards.ToList();
        }

        public CardDb? Read(int id)
        {
            return _context.Cards.Find(id);
        }

        public IEnumerable<CardDb> ReadByAccountId(int accountId)
        {
            return _context.Cards.Where(p => p.AccountId == accountId).ToList();
        }

        public CardDb Create(CardDb item)
        {
            _context.Cards.Add(item);
            _context.SaveChanges();

            return item;
        }

        public CardDb Update(CardDb item)
        {
            _context.Cards.Update(item);
            _context.SaveChanges();

            return item;
        }

        public void Delete(int id)
        {
            CardDb? item = _context.Cards.Find(id);

            if (null != item)
            {
                _context.Cards.Remove(item);
                _context.SaveChanges();
            }
        }

        public CardDb? ReadByNumber(string number)
        {
            return _context.Cards.FirstOrDefault(p => p.Number == number);
        }
    }
}
