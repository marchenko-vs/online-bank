using OnlineBank.Data;
using OnlineBank.DbLayer;
using OnlineBank.Repositories;
using AutoMapper;
using System.Text;

namespace OnlineBank.Models
{
    public class CardModel
    {
        private readonly ICardRepository<CardDb> _db;
        private readonly MapperConfiguration _mapperCfg;
        private readonly Mapper _mapper;

        public CardModel(AppDbContext context)
        {
            _db = new CardRepository(context);
            _mapperCfg = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<CardDb, CardBl>();
                cfg.CreateMap<CardBl, CardDb>();
            });
            _mapper = new Mapper(_mapperCfg);
        }

        public CardBl Open(CardBl card)
        {
            if (!card.PaymentSystem.Equals("MIR") &&
                !card.PaymentSystem.Equals("MasterCard") &&
                !card.PaymentSystem.Equals("VISA"))
            {

                throw new Exception("Unsupported payment system");
            }

            if (!card.Currency.Equals("RUB") &&
                !card.Currency.Equals("EUR") &&
                !card.Currency.Equals("USD"))
            {
               
                throw new Exception("Unsupported currency");
            }

            List<CardBl> accounts = _mapper.Map<List<CardBl>>(_db.ReadByAccountId(card.AccountId).ToList());

            if (accounts.Count == 5)
            {
                throw new Exception("Max num of cards are opened for this account");
            }

            Random generator = new Random();
            StringBuilder sb = new StringBuilder(16);
            for (int i = 0; i < 16; ++i)
            {
                sb.Append(generator.Next(0, 10));
            }

            card.Number = sb.ToString();
            card.Balance = Decimal.Zero;
            card.IssueDate = DateTime.Now;
            card.ValidityDate = card.IssueDate.AddYears(5);
            card.Cvv = generator.Next(100, 1000).ToString();
            card.Status = "выпущена";
            
            try
            {
                var createdCard = _db.Create(_mapper.Map<CardDb>(card));

                return _mapper.Map<CardBl>(createdCard);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public CardBl ChangeBalance(CardBl card, decimal delta)
        {
            if (card.Balance + delta < 0)
            {
                throw new Exception();
            }

            var existingCard = _db.Read(card.Id);
            existingCard.Balance += delta;

            return _mapper.Map<CardBl>(_db.Update(existingCard));
        }

        public CardBl GetByNumber(string number)
        {
            return _mapper.Map<CardBl>(_db.ReadByNumber(number));
        }

        public CardBl GetById(int cardId)
        {
            return _mapper.Map<CardBl>(_db.Read(cardId));
        }

        public List<CardBl> GetByAccountId(int accountId)
        {
            return _mapper.Map<List<CardBl>>(_db.ReadByAccountId(accountId));
        }
    }
}
