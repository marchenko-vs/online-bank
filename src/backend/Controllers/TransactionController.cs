using OnlineBank.Data;
using OnlineBank.Models;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using OnlineBank.DbLayer;
using OnlineBank.ApiDto;

namespace OnlineBank.Controllers
{
    [ApiController]
    [Tags("Transactions")]
    [Route("api/v1")]
    public class TransactionController : ControllerBase
    {
        private readonly ILogger<TransactionController> _logger;
        private readonly IConfiguration _cfg;

        private readonly MapperConfiguration _mapperCfg;
        private readonly Mapper _mapper;

        public TransactionController(IConfiguration configuration, ILogger<TransactionController> logger)
        {
            _cfg = configuration;

            _logger = logger;

            _mapperCfg = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<TransactionDto, TransactionBl>();
                cfg.CreateMap<TransactionBl, TransactionDto>();
            });
            _mapper = new Mapper(_mapperCfg);
        }

        [Authorize]
        [HttpPost]
        [Route("transactions")]
        [SwaggerResponse(400, "Not enough money")]
        [SwaggerResponse(401, "Unauthorized user")]
        [SwaggerResponse(409, "Different currencies")]
        [SwaggerResponse(200, "OK")]
        public IActionResult Post([FromBody] TransactionDto transaction)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var role = identity!.FindFirst("Role")!.Value;
            int id = Convert.ToInt32(identity!.FindFirst("Id")!.Value);

            var dbContext = new AppDbContext(DbFactory.Create(_cfg));

            var transactionModel = new TransactionModel(dbContext);

            var cardModel = new CardModel(dbContext);
            var senderCard = cardModel.GetByNumber(transaction.SenderNumber);
            var receiverCard = cardModel.GetByNumber(transaction.ReceiverNumber);

            if (senderCard == null || receiverCard == null)
            {
                return BadRequest();
            }

            var accountModel = new AccountModel(dbContext);
            var senderAccount = accountModel.GetById(senderCard.AccountId);
            var receiverAccount = accountModel.GetById(receiverCard.AccountId);

            if (senderAccount == null || receiverAccount == null)
            {
                return BadRequest();
            }

            if (senderCard.Currency != receiverCard.Currency)
            {
                return Conflict();
            }

            if (senderCard.Balance < transaction.Sum || transaction.Sum < 0)
            {
                return BadRequest();
            }

            transaction.Currency = senderCard.Currency;
            transaction.CardId = senderCard.Id;

            try
            {
                cardModel.ChangeBalance(senderCard, -transaction.Sum);
                cardModel.ChangeBalance(receiverCard, transaction.Sum);

                accountModel.ChangeBalance(senderAccount, -transaction.Sum);
                accountModel.ChangeBalance(receiverAccount, transaction.Sum);

                var createdTransaction = transactionModel.Conduct(_mapper.Map<TransactionBl>(transaction));

                return Ok(_mapper.Map<TransactionDto>(createdTransaction));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
