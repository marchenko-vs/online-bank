using OnlineBank.Utils;
using OnlineBank.Data;
using OnlineBank.DbLayer;
using OnlineBank.Repositories;
using OnlineBank.Exceptions;
using AutoMapper;
using OnlineBank.BlLayer;
using Microsoft.IdentityModel.Tokens;

namespace OnlineBank.Models
{
    public class UserModel
    {
        private readonly IUserRepository<UserDb> _db;
        private readonly MapperConfiguration _mapperCfg;
        private readonly Mapper _mapper;

        public UserModel(AppDbContext context)
        {
            _db = new UserRepository(context);
            _mapperCfg = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<UserDb, UserBl>();
                cfg.CreateMap<UserBl, UserDb>();
            });
            _mapper = new Mapper(_mapperCfg);
        }

        public UserBl Register(UserBl user)
        {
            if (user.FirstName.IsNullOrEmpty() ||
                user.LastName.IsNullOrEmpty() ||
                user.BirthDate.CompareTo(new DateTime(1920, 1, 1)) < 0 ||
                user.Email.IsNullOrEmpty() || user.Email.Length < 3 ||
                user.Password.IsNullOrEmpty() || user.Password.Length < 6 ||
                user.Country.IsNullOrEmpty() || user.Country.Length < 4 ||
                user.Region.IsNullOrEmpty() ||
                user.AddressLine1.IsNullOrEmpty() ||
                user.PostalCode.IsNullOrEmpty() ||
                user.IdType.IsNullOrEmpty() ||
                user.IdNumber.IsNullOrEmpty() ||
                user.IdIssueDate.CompareTo(user.BirthDate) < 0 ||
                user.IdValidityDate.CompareTo(user.IdIssueDate) < 0 ||
                user.DepartmentCode.IsNullOrEmpty())
            {
                throw new IncorrectDataException();
            }

            UserDb userToCreate = _mapper.Map<UserDb>(user);

            userToCreate.Role = "client";
            userToCreate.Salt = Guid.NewGuid().ToString();
            userToCreate.HashedPassword = Security.Encrypt(user.Password + userToCreate.Salt);

            try
            {
                var createdUser = _db.Create(userToCreate);

                return _mapper.Map<UserBl>(createdUser);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw new ExistingUserException(String.Format("Пользователь {0} уже зарегистрирован", user.Email));
            }
        }

        private static bool Verify(UserDb user, string password)
        {
            string correctPassword = user.HashedPassword;
            string salt = user.Salt;

            string hashedPassword = Security.Encrypt(password + salt);

            return correctPassword == hashedPassword;
        }

        public UserBl Login(UserBl user)
        {
            var existingUser = _db.ReadByEmail(user.Email);

            if (null == existingUser)
            {
                throw new NotExistingUserException(String.Format("Пользователь {0} не найден", user.Email));
            }

            if (false == Verify(existingUser, user.Password))
            {
                throw new IncorrectPasswordException(String.Format("Введен неверный пароль"));
            }

            return _mapper.Map<UserBl>(existingUser);
        }

        public UserBl ChangeProfile(UserBl user)
        {
            var existingUser = _db.Read(user.Id);

            if (existingUser == null)
            {
                throw new NotFoundException();
            }

            if (!Verify(existingUser, user.OldPassword))
            {
                throw new Exception();
            }

            if (!user.FirstName.IsNullOrEmpty())
            {
                existingUser.FirstName = user.FirstName;
            }
            if (!user.LastName.IsNullOrEmpty())
            {
                existingUser.LastName = user.LastName;
            }
            if (!user.Patronymic.IsNullOrEmpty())
            {
                existingUser.Patronymic = user.Patronymic;
            }
            if (user.BirthDate.CompareTo(new DateTime(1920, 1, 1)) >= 0 &&
                user.BirthDate.CompareTo(user.IdIssueDate) < 0)
            {
                existingUser.BirthDate = user.BirthDate;
            }
            if (!user.Email.IsNullOrEmpty())
            {
                existingUser.Email = user.Email;
            }
            if (!user.PhoneNum.IsNullOrEmpty())
            {
                existingUser.PhoneNum = user.PhoneNum;
            }
            if (!user.NewPassword.IsNullOrEmpty() && user.NewPassword.Length >= 6)
            {
                existingUser.Salt = Guid.NewGuid().ToString();
                existingUser.HashedPassword = Security.Encrypt(user.NewPassword + existingUser.Salt);
            }
            if (!user.Country.IsNullOrEmpty())
            {
                existingUser.Country = user.Country;
            }
            if (!user.Region.IsNullOrEmpty())
            {
                existingUser.Region = user.Region;
            }
            if (!user.City.IsNullOrEmpty())
            {
                existingUser.City = user.City;
            }
            if (!user.AddressLine1.IsNullOrEmpty())
            {
                existingUser.AddressLine1 = user.AddressLine1;
            }
            if (!user.AddressLine2.IsNullOrEmpty())
            {
                existingUser.AddressLine2 = user.AddressLine2;
            }
            if (!user.PostalCode.IsNullOrEmpty())
            {
                existingUser.PostalCode = user.PostalCode;
            }
            if (!user.IdType.IsNullOrEmpty())
            {
                existingUser.IdType = user.IdType;
            }
            if (!user.IdSeries.IsNullOrEmpty())
            {
                existingUser.IdSeries = user.IdSeries;
            }
            if (!user.IdNumber.IsNullOrEmpty())
            {
                existingUser.IdNumber = user.IdNumber;
            }
            if (user.IdIssueDate.CompareTo(new DateTime(3000, 1, 1)) < 0 &&
                user.IdIssueDate.CompareTo(user.BirthDate) > 0)
            {
                existingUser.IdIssueDate = user.IdIssueDate;
            }
            if (user.IdValidityDate.CompareTo(new DateTime(3000, 1, 1)) < 0 &&
                user.IdValidityDate.CompareTo(user.IdIssueDate) > 0)
            {
                existingUser.IdValidityDate = user.IdValidityDate;
            }
            if (!user.DepartmentCode.IsNullOrEmpty())
            {
                existingUser.DepartmentCode = user.DepartmentCode;
            }

            try
            {
                var updatedUser = _db.Update(existingUser);
                return _mapper.Map<UserBl>(updatedUser);
            }
            catch (Exception)
            {
                throw new ExistingUserException(String.Format("Почта {0} уже используется", user.Email));
            }
        }

        public UserBl? GetById(int id)
        {
            return _mapper.Map<UserBl>(_db.ReadById(id));
        }
    }
}
