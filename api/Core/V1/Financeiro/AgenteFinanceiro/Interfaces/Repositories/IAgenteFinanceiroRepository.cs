using Core.V1.Financeiro.AgenteFinanceiro.Models;

namespace Core.V1.Financeiro.AgenteFinanceiro.Interfaces.Repositories
{
    public interface IAgenteFinanceiroRepository
    {
        Task<int> AddAsync(AgenteFinanceiroModel agenteFinanceiro);
        Task<int> UpdateAsync(int id, AgenteFinanceiroModel agenteFinanceiro);
        Task<int> DeleteAsync(int id);
        Task<AgenteFinanceiroModel> GetByIdAsync(int id);
        Task<IEnumerable<AgenteFinanceiroModel>> GetAllAsync();
        Task<IEnumerable<BancooModel>> GetBancoAsync();
    }
}