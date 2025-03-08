namespace Core.V1.Financeiro.Banco.Models
{
    public class BancoModel
    {
        public int Id { get; set; }
        public int Codigo { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public string Cor { get; set; } = string.Empty;
    }
}