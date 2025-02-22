namespace Core.V1.Financeiro.AgenteFinanceiro.Models
{
    public class AgenteFinanceiroModel
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public int IdTipoAgenteFinanceiro { get; set; }
        public int? IdBanco { get; set; }
        public string BancoDescricao { get; set; } = string.Empty;
        public string BancoLogo { get; set; } = string.Empty;
        public string BancoCor { get; set; } = string.Empty;
        public int? Agencia { get; set; }
        public int? DigitoAgencia { get; set; }
        public int? Conta { get; set; }
        public int? DigitoConta { get; set; }
        public bool ComputaSaldo { get; set; }
    }
}