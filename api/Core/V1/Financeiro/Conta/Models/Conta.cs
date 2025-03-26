using Core.V1.Cadastros.Usuario.Models;

namespace Core.V1.Financeiro.Conta.Models
{
    public class ContaModel
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public int IdTipoConta { get; set; }
        public int? IdBanco { get; set; }
        public string BancoDescricao { get; set; } = string.Empty;
        public string BancoCor { get; set; } = string.Empty;
        public int? Agencia { get; set; }
        public int? DigitoAgencia { get; set; }
        public int? Conta { get; set; }
        public int? DigitoConta { get; set; }
        public bool ComputaSaldo { get; set; }
        public int UsuarioId { get; set; }
    }
}