IF NOT EXISTS (SELECT * FROM sys.indexes 
               WHERE object_id = OBJECT_ID('Banco') 
               AND name = 'UQ_Banco_Codigo')
BEGIN
    ALTER TABLE Banco
    ADD CONSTRAINT UQ_Banco_Codigo UNIQUE (Codigo);
END;