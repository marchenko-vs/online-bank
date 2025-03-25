using System.Security.Cryptography;
using System.Text;

namespace OnlineBank.Utils
{
    public static class Security
    {
        public static string Encrypt(string password)
        {
            byte[] byteArray = Encoding.ASCII.GetBytes(password);
            var hashedPassword = SHA256.HashData(byteArray);
            string passwordBase64 = Convert.ToBase64String(hashedPassword);

            return passwordBase64;
        }
    }
}
