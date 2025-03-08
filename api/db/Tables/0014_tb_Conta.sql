IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Conta' AND xtype='U')
BEGIN
    CREATE TABLE Conta (
        Id                     INT PRIMARY KEY IDENTITY(1,1),
        Descricao              VARCHAR(200) NOT NULL,
        IdTipoConta            INT NOT NULL,
        IdBanco                INT,
        Agencia                INT,
        DigitoAgencia          INT,
        Conta                  INT,
        DigitoConta            INT,
        ComputaSaldo           BIT

        CONSTRAINT FK_Conta_TipoConta FOREIGN KEY (IdTipoConta) REFERENCES TipoAgenteFinanceiro(Id),
        CONSTRAINT FK_Conta_Banco FOREIGN KEY (IdBanco) REFERENCES Banco(Id)
    );
END;