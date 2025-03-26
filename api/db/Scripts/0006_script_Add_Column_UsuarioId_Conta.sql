IF NOT EXISTS (SELECT * FROM sys.columns 
               WHERE object_id = OBJECT_ID('dbo.Conta') 
               AND name = 'UsuarioId')
BEGIN
    ALTER TABLE dbo.Conta
    ADD UsuarioId INT NOT NULL;

    ALTER TABLE dbo.Conta
    ADD CONSTRAINT FK_Conta_Usuario FOREIGN KEY (UsuarioId) REFERENCES Usuario(Id);
END;