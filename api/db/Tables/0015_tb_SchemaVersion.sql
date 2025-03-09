IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='SchemaVersion' AND xtype='U')
BEGIN
    CREATE TABLE SchemaVersion (
        Id           INT PRIMARY KEY IDENTITY(1,1),
        Version      VARCHAR(50) NOT NULL,
        DataExecucao DATETIME    NOT NULL,
    );
END;