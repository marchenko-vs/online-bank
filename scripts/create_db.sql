USE master;

IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'prod_db')
BEGIN
  CREATE DATABASE prod_db;
  PRINT 'Database created successfully.';
END
ELSE
BEGIN
  PRINT 'Database already exists.';
END
