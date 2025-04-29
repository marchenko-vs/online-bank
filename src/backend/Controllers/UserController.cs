using OnlineBank.Data;
using OnlineBank.Models;
using Microsoft.AspNetCore.Mvc;
using OnlineBank.Exceptions;
using Swashbuckle.AspNetCore.Annotations;
using AutoMapper;
using OnlineBank.BlLayer;
using OnlineBank.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using OnlineBank.ApiDto;

namespace OnlineBank.Controllers
{
    [ApiController]
    [Tags("Users")]
    [Route("api/v1")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IConfiguration _cfg;

        private readonly MapperConfiguration _mapperCfg;
        private readonly Mapper _mapper;

        public UserController(IConfiguration configuration, ILogger<UserController> logger)
        {
            _cfg = configuration;

            _logger = logger;

            _mapperCfg = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<UserDtoGet, UserBl>();
                cfg.CreateMap<UserBl, UserDtoGet>();
                cfg.CreateMap<UserDtoPost, UserBl>();
                cfg.CreateMap<UserBl, UserDtoPost>();
                cfg.CreateMap<UserDtoPatch, UserBl>();
                cfg.CreateMap<UserBl, UserDtoPatch>();
                cfg.CreateMap<UserDtoLogin, UserBl>();
                cfg.CreateMap<UserBl, UserDtoLogin>();
            });
            _mapper = new Mapper(_mapperCfg);
        }

        [Authorize]
        [HttpGet]
        [Route("users/me")]
        [SwaggerResponse(401, "Unauthorized user")]
        [SwaggerResponse(200, "OK")]
        public IActionResult Get()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var role = identity!.FindFirst("Role")!.Value;
            int id = Convert.ToInt32(identity!.FindFirst("Id")!.Value);

            var dbContext = new AppDbContext(DbFactory.Create(_cfg, role));
            var userModel = new UserModel(dbContext);

            try
            {
                var user = userModel.GetById(id);

                return Ok(_mapper.Map<UserDtoGet>(user));
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("users/login")]
        [SwaggerResponse(400, "Incorrect input data")]
        [SwaggerResponse(404, "User is not in database")]
        [SwaggerResponse(200, "OK")]
        public IActionResult Post([FromBody]UserDtoLogin user)
        {
            var dbContext = new AppDbContext(DbFactory.Create(_cfg));
            var userModel = new UserModel(dbContext);

            try
            {
                var existingUser = userModel.Login(_mapper.Map<UserBl>(user));

                var tokenClass = new TokenClass();
                var token = tokenClass.GenerateToken(new TokenRequest
                {
                    Id = existingUser.Id,
                    Role = existingUser.Role,
                    Email = user.Email,
                    Password = user.Password
                });

                return Ok(new TokenResponse
                {
                    Jwt = token
                });
            }
            catch (NotExistingUserException)
            {
                return NotFound();
            }
            catch (IncorrectPasswordException)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("users")]
        [SwaggerResponse(400, "Incorrect input data")]
        [SwaggerResponse(409, "Email is busy")]
        [SwaggerResponse(200, "OK")]
        public IActionResult Post(UserDtoPost user)
        {
            var dbContext = new AppDbContext(DbFactory.Create(_cfg));
            var userModel = new UserModel(dbContext);

            try
            {
                var createdUser = userModel.Register(_mapper.Map<UserBl>(user));
                return Ok(_mapper.Map<UserDtoGet>(createdUser));
            }
            catch (ExistingUserException)
            {
                return Conflict();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return BadRequest();
            }
        }

        [Authorize]
        [HttpPatch]
        [Route("users/me")]
        [SwaggerResponse(400, "Incorrect input data")]
        [SwaggerResponse(401, "Unauthorized user")]
        [SwaggerResponse(404, "User is not in database")]
        [SwaggerResponse(409, "Email is busy")]
        [SwaggerResponse(200, "OK")]
        public IActionResult Patch([FromBody]UserDtoPatch user)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var id = Convert.ToInt32(identity.FindFirst("Id").Value);
            var role = identity!.FindFirst("Role")!.Value;

            var dbContext = new AppDbContext(DbFactory.Create(_cfg, role));
            var userModel = new UserModel(dbContext);
            user.Id = id;

            try
            {
                var createdUser = userModel.ChangeProfile(_mapper.Map<UserBl>(user));
                return Ok(_mapper.Map<UserDtoGet>(createdUser));
            }
            catch (NotFoundException)
            {
                return NotFound();
            }
            catch (ExistingUserException)
            {
                return Conflict();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
