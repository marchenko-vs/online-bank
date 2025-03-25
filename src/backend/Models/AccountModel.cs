using OnlineBank.Data;
using OnlineBank.DbLayer;
using OnlineBank.Repositories;
using OnlineBank.Exceptions;
using AutoMapper;
using OnlineBank.BlLayer;
using System.Text;

namespace OnlineBank.Models
{
    public class AccountModel
    {
        private readonly IAccountRepository<AccountDb> _db;
        private readonly MapperConfiguration _mapperCfg;
        private readonly Mapper _mapper;

        public AccountModel(AppDbContext context)
        {
            _db = new AccountRepository(context);
            _mapperCfg = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<AccountDb, AccountBl>();
                cfg.CreateMap<AccountBl, AccountDb>();
            });
            _mapper = new Mapper(_mapperCfg);
        }

        public AccountBl Open(AccountBl account)
        {
            if (!account.Currency.Equals("RUB") &&
                !account.Currency.Equals("EUR") &&
                !account.Currency.Equals("USD"))
            {
               
                throw new Exception("Unsupported currency");
            }

            List<AccountDb> accounts = _db.ReadByUserId(account.UserId).ToList();

            foreach (var item in accounts) 
            { 
                if (item.Currency == account.Currency)
                {
                    throw new ExistingAccountException();
                }
            }

            Random generator = new Random();
            StringBuilder sb = new StringBuilder("40817", 20);
            for (int i = 0; i < 15; ++i)
            {
                sb.Append(generator.Next(0, 10));
            }

            account.Number = sb.ToString();
            account.Balance = Decimal.Zero;
            account.IssueDate = DateTime.Now;
            account.Status = "открыт";
            
            try
            {
                var createdAccount = _db.Create(_mapper.Map<AccountDb>(account));

                return _mapper.Map<AccountBl>(createdAccount);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public AccountBl? GetById(int id)
        {
            return _mapper.Map<AccountBl>(_db.Read(id));
        }

        public List<AccountBl> GetByUserId(int userId)
        {
            return _mapper.Map<List<AccountBl>>(_db.ReadByUserId(userId));
        }

        public AccountBl ChangeBalance(AccountBl account, decimal delta)
        {
            if (account.Balance + delta < 0)
            {
                throw new Exception();
            }

            var existingAccount = _db.Read(account.Id);
            existingAccount.Balance += delta;

            return _mapper.Map<AccountBl>(_db.Update(existingAccount));
        }
    }
}
