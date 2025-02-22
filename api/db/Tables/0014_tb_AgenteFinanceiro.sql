IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='AgenteFinanceiro' AND xtype='U')
BEGIN
    CREATE TABLE AgenteFinanceiro (
        Id                     INT PRIMARY KEY IDENTITY(1,1),
        Descricao              VARCHAR(200) NOT NULL,
        IdTipoAgenteFinanceiro INT NOT NULL,
        IdBanco                INT,
        Agencia                INT,
        DigitoAgencia          INT,
        Conta                  INT,
        DigitoConta            INT,
        ComputaSaldo           BIT

        CONSTRAINT FK_AgenteFinanceiro_TipoAgenteFinanceiro FOREIGN KEY (IdTipoAgenteFinanceiro) REFERENCES TipoAgenteFinanceiro(Id),
        CONSTRAINT FK_AgenteFinanceiro_Banco FOREIGN KEY (IdBanco) REFERENCES Banco(Id)
    );
END;