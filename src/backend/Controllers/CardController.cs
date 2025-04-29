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
    [Tags("Cards")]
    [Route("api/v1")]
    public class CardController : ControllerBase
    {
        private readonly ILogger<CardController> _logger;
        private readonly IConfiguration _cfg;

        private readonly MapperConfiguration _mapperCfg;
        private readonly Mapper _mapper;

        public CardController(IConfiguration configuration, ILogger<CardController> logger)
        {
            _cfg = configuration;

            _logger = logger;

            _mapperCfg = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<CardDto, CardBl>();
                cfg.CreateMap<CardBl, CardDto>();
            });
            _mapper = new Mapper(_mapperCfg);
        }

        [Authorize]
        [HttpGet]
        [Route("cards/{cardId}")]
        [SwaggerResponse(401, "Unauthorized user")]
        [SwaggerResponse(404, "Card is not in database")]
        [SwaggerResponse(200, "OK")]
        public IActionResult GetCard(int cardId)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            var dbContext = new AppDbContext(DbFactory.Create(_cfg));
            var cardModel = new CardModel(dbContext);

            try
            {
                var card = cardModel.GetById(cardId);
                return Ok(_mapper.Map<CardDto>(card));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return NotFound();
            }
        }

        [Authorize]
        [HttpGet]
        [Route("accounts/{accountId}/cards")]
        [SwaggerResponse(401, "Unauthorized user")]
        [SwaggerResponse(200, "OK")]
        public IActionResult Get(int accountId)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            var dbContext = new AppDbContext(DbFactory.Create(_cfg));
            var cardModel = new CardModel(dbContext);

            try
            {
                var cards = cardModel.GetByAccountId(accountId);
                return Ok(_mapper.Map<List<CardDto>>(cards));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }
        }

        [Authorize]
        [HttpPost]
        [Route("accounts/{accountId}/cards")]
        [SwaggerResponse(400, "Incorrect input data")]
        [SwaggerResponse(401, "Unauthorized user")]
        [SwaggerResponse(200, "OK")]
        public IActionResult Post([FromBody]CardDto card, int accountId)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var role = identity!.FindFirst("Role")!.Value;
            int id = Convert.ToInt32(identity!.FindFirst("Id")!.Value);

            var dbContext = new AppDbContext(DbFactory.Create(_cfg));
            var cardModel = new CardModel(dbContext);
            var accountModel = new AccountModel(dbContext);

            var account = accountModel.GetById(accountId);

            if (account == null)
            {
                return BadRequest();
            }

            card.AccountId = accountId;
            card.Currency = account.Currency;

            try
            {
                var createdCard = cardModel.Open(_mapper.Map<CardBl>(card));
                return Ok(_mapper.Map<CardDto>(createdCard));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
