WAITFOR DELAY '00:00:15';
USE prod_db;

IF OBJECT_ID('[Users]', 'U') IS NULL
BEGIN
	CREATE TABLE [Users] (
		[Id] [integer] IDENTITY(1, 1),
		[Role] [varchar](32) NOT NULL,
		[FirstName] [nvarchar](32) NOT NULL,
		[LastName] [nvarchar](32) NOT NULL,
		[Patronymic] [nvarchar](32),
		[BirthDate] [datetime] NOT NULL,
		[Email] [varchar](32) NOT NULL UNIQUE,
		[Salt] [varchar](64) NOT NULL,
		[HashedPassword] [varchar](64) NOT NULL,
		[PhoneNum] [varchar](16),
		[Country] [nvarchar](64) NOT NULL,
		[Region] [nvarchar](64) NOT NULL,
		[City] [nvarchar](64),
		[AddressLine1] [nvarchar](128) NOT NULL,
		[AddressLine2] [nvarchar](128),
		[PostalCode] [varchar](16),
		[IdType] [nvarchar](32) NOT NULL,
		[IdSeries] [varchar](10),
		[IdNumber] [varchar](10) NOT NULL,
		[IdIssueDate] [datetime] NOT NULL,
		[IdValidityDate] [datetime] NOT NULL,
		[DepartmentCode] [varchar](10) NOT NULL,
		
		PRIMARY KEY (Id)
	);
END

IF OBJECT_ID('[Accounts]', 'U') IS NULL
BEGIN
	CREATE TABLE [Accounts] (
		[Id] [integer] IDENTITY(1, 1),
		[UserId] [integer] NOT NULL,
		[Number] [varchar](48) NOT NULL UNIQUE,
		[IssueDate] [datetime] NOT NULL,
		[Balance] [money] NOT NULL,
		[Currency] [varchar](6) NOT NULL,
		[Status] [nvarchar](16) NOT NULL
		
		PRIMARY KEY (Id),
		CONSTRAINT FK_USER_ID
		FOREIGN KEY (UserId) REFERENCES [Users] (Id)
		ON DELETE CASCADE
	);
END

IF OBJECT_ID('[Cards]', 'U') IS NULL
BEGIN
	CREATE TABLE [Cards] (
		[Id] [integer] IDENTITY(1, 1),
		[AccountId] [integer] NOT NULL,
		[PaymentSystem] [varchar](16) NOT NULL,
		[Number] [varchar](16) NOT NULL UNIQUE,
		[IssueDate] [datetime] NOT NULL,
		[ValidityDate] [datetime] NOT NULL,
		[Cvv] [varchar](3) NOT NULL,
		[Balance] [money] NOT NULL,
		[Currency] [varchar](6) NOT NULL,
		[Status] [nvarchar](16) NOT NULL
		
		PRIMARY KEY (Id),
		CONSTRAINT FK_ACCOUNT_ID
		FOREIGN KEY (AccountId) REFERENCES [Accounts] (Id)
		ON DELETE CASCADE
	);
END

IF OBJECT_ID('[Transactions]', 'U') IS NULL
BEGIN
	CREATE TABLE [Transactions] (
		[Id] [integer] IDENTITY(1, 1),
		[CardId] [integer] NOT NULL, 
		[SenderNumber] [varchar](16) NOT NULL,
		[ReceiverNumber] [varchar](16) NOT NULL,
		[Sum] [money] NOT NULL CHECK(Sum >= 0),
		[Currency] [varchar](6) NOT NULL,
		[Date] [datetime] NOT NULL,
		[Status] [nvarchar](16) NOT NULL,
		
		PRIMARY KEY (Id),
		CONSTRAINT FK_CARD_ID
		FOREIGN KEY (CardId) REFERENCES [Cards] (Id)
		ON DELETE CASCADE
	);
END
