using System.Text;

namespace OnlineBank.Data
{
    public static class DbFactory
    {
        public static string Create(IConfiguration config, string role = "client", string mode = "default")
        {
            StringBuilder connectionString = new StringBuilder();

            if (mode == "default")
            {
                connectionString.Append(config.GetConnectionString("DefaultConnection"));
            }
            else if (mode == "testing")
            {
                connectionString.Append(config.GetConnectionString("TestingConnection"));
            }

            if (role == "employee")
            {
                connectionString.Append(config.GetSection("DbLoginData").GetValue<string>("EmployeeLogin"));
            }
            else
            {
                connectionString.Append(config.GetSection("DbLoginData").GetValue<string>("ClientLogin"));
            }

            return connectionString.ToString();
        }
    }
}
