using Core.V1.Financeiro.Conta.Models;
using Core.V1.Financeiro.Banco.Models;

namespace Core.V1.Financeiro.Conta.Interfaces.Services
{
    public interface IContaService
    {
        Task<int> AddAsync(ContaModel conta);
        Task<int> UpdateAsync(int id, ContaModel conta);
        Task<int> DeleteAsync(int id);
        Task<ContaModel> GetByIdAsync(int id);
        Task<IEnumerable<ContaModel>> GetAllAsync();
        Task<IEnumerable<BancoModel>> GetBancosAsync();
    }
}