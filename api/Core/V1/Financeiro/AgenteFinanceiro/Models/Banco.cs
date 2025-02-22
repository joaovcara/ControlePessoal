namespace Core.V1.Financeiro.AgenteFinanceiro.Models
{
    public class BancooModel
    {
        public int Id { get; set; }
        public int Codigo { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public string NM_Logo { get; set; } = string.Empty;
        public string Cor { get; set; } = string.Empty;
    }
}