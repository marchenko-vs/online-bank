namespace OnlineBank.Exceptions
{
    public class ExistingUserException : Exception
    {
        public ExistingUserException(string info) : base(info)
        { 
        
        }
    }

    public class NotExistingUserException : Exception
    {
        public NotExistingUserException(string info) : base(info)
        {

        }
    }

    public class IncorrectPasswordException : Exception
    {
        public IncorrectPasswordException(string info) : base(info)
        {

        }
    }

    public class NoTicketsException : Exception
    {
        public NoTicketsException(string info) : base(info)
        {

        }
    }

    public class NotLoggedInException : Exception
    {
        public NotLoggedInException(string info) : base(info)
        {

        }
    }

    public class NotFoundException : Exception
    {
        public NotFoundException() : base()
        {

        }
    }

    public class IncorrectDataException : Exception
    {
        public IncorrectDataException() : base()
        {

        }
    }

    public class ExistingAccountException : Exception
    {
        public ExistingAccountException() : base()
        {

        }
    }
}