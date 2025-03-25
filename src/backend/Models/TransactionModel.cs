using OnlineBank.Data;
using OnlineBank.DbLayer;
using OnlineBank.Repositories;
using AutoMapper;

namespace OnlineBank.Models
{
    public class TransactionModel
    {
        private readonly ITransactionRepository<TransactionDb> _db;
        private readonly MapperConfiguration _mapperCfg;
        private readonly Mapper _mapper;

        public TransactionModel(AppDbContext context)
        {
            _db = new TransactionRepository(context);
            _mapperCfg = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<TransactionDb, TransactionBl>();
                cfg.CreateMap<TransactionBl, TransactionDb>();
            });
            _mapper = new Mapper(_mapperCfg);
        }

        public TransactionBl Conduct(TransactionBl transaction)
        {
            if (!transaction.Currency.Equals("RUB") &&
                !transaction.Currency.Equals("EUR") &&
                !transaction.Currency.Equals("USD"))
            {
               
                throw new Exception("Unsupported currency");
            }

            transaction.Date = DateTime.Now;
            transaction.Status = "completed";
            
            try
            {
                var createdTransaction = _db.Create(_mapper.Map<TransactionDb>(transaction));

                return _mapper.Map<TransactionBl>(createdTransaction);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
