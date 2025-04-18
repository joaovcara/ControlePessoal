using Core.V1.Financeiro.Conta.Models;
using Core.V1.Financeiro.Banco.Models;

namespace Core.V1.Financeiro.Conta.Interfaces.Repositories
{
    public interface IContaRepository
    {
        Task<int> AddAsync(ContaModel conta);
        Task<int> UpdateAsync(int id, ContaModel conta);
        Task<int> DeleteAsync(int id);
        Task<ContaModel> GetByIdAsync(int id);
        Task<IEnumerable<ContaModel>> GetAllAsync(int usuarioId);
        Task<IEnumerable<BancoModel>> GetBancoAsync();
        Task<IEnumerable<ContaModel>> GetByUsuarioIdAsync(int usuarioId);
    }
}