using OnlineBank.Data;
using OnlineBank.Models;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using AutoMapper;
using OnlineBank.BlLayer;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using OnlineBank.Exceptions;
using OnlineBank.ApiDto;

namespace OnlineBank.Controllers
{
    [ApiController]
    [Tags("Accounts")]
    [Route("api/v1")]
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;
        private readonly IConfiguration _cfg;

        private readonly MapperConfiguration _mapperCfg;
        private readonly Mapper _mapper;

        public AccountController(IConfiguration configuration, ILogger<AccountController> logger)
        {
            _cfg = configuration;

            _logger = logger;

            _mapperCfg = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<AccountDtoGet, AccountBl>();
                cfg.CreateMap<AccountBl, AccountDtoGet>();
                cfg.CreateMap<AccountDtoPost, AccountBl>();
                cfg.CreateMap<AccountBl, AccountDtoPost>();
            });
            _mapper = new Mapper(_mapperCfg);
        }

        [Authorize]
        [HttpGet]
        [Route("accounts/me")]
        [SwaggerResponse(401, "Unauthorized user")]
        [SwaggerResponse(200, "OK")]
        public IActionResult Get()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var role = identity!.FindFirst("Role")!.Value;
            int id = Convert.ToInt32(identity!.FindFirst("Id")!.Value);

            var dbContext = new AppDbContext(DbFactory.Create(_cfg, role));
            var accountModel = new AccountModel(dbContext);
            
            try
            {
                var account = accountModel.GetByUserId(id);

                return Ok(_mapper.Map<List<AccountDtoGet>>(account));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return BadRequest();
            }
        }

        [Authorize]
        [HttpPost]
        [Route("accounts")]
        [SwaggerResponse(400, "Incorrect input data")]
        [SwaggerResponse(401, "Unauthorized user")]
        [SwaggerResponse(409, "Account already exists")]
        [SwaggerResponse(200, "OK")]
        public IActionResult Post([FromBody]AccountDtoPost account)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var role = identity!.FindFirst("Role")!.Value;
            int id = Convert.ToInt32(identity!.FindFirst("Id")!.Value);

            var dbContext = new AppDbContext(DbFactory.Create(_cfg));
            var accountModel = new AccountModel(dbContext);

            account.UserId = id;

            try
            {
                var createdAccount = accountModel.Open(_mapper.Map<AccountBl>(account));
                return Ok(_mapper.Map<AccountDtoGet>(createdAccount));
            }
            catch (ExistingAccountException)
            {
                return Conflict();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }
        }
    }
}
