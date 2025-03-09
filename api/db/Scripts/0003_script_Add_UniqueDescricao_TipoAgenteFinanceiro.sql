IF NOT EXISTS (SELECT * FROM sys.indexes 
               WHERE object_id = OBJECT_ID('TipoAgenteFinanceiro') 
               AND name = 'UQ_TipoAgenteFinanceiro_Descricao')
BEGIN
    ALTER TABLE TipoAgenteFinanceiro
    ADD CONSTRAINT UQ_TipoAgenteFinanceiro_Descricao UNIQUE (Descricao);
END;