CREATE ROLE db_reader;
GRANT SELECT ON Users TO db_reader;
GRANT SELECT ON Accounts TO db_reader;
GRANT SELECT ON Cards TO db_reader;
GRANT SELECT ON Transactions TO db_reader;
DENY CREATE TABLE TO db_reader;
DENY ALTER ANY SCHEMA TO db_reader;
CREATE LOGIN reader WITH PASSWORD = 'read1234READ';
CREATE USER reader FOR LOGIN reader;
ALTER ROLE db_reader ADD MEMBER reader;


ALTER ROLE db_reader DROP MEMBER reader;
DROP ROLE db_reader;
DROP LOGIN reader;
DROP USER reader;
