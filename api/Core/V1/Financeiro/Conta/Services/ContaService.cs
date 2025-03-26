using Core.V1.Financeiro.Conta.Interfaces.Repositories;
using Core.V1.Financeiro.Conta.Interfaces.Services;
using Core.V1.Financeiro.Conta.Models;
using Core.V1.Financeiro.Banco.Models;

namespace Core.V1.Financeiro.Conta.Services
{
    public class ContaService : IContaService
    {
        private readonly IContaRepository _contaRepository;

        public ContaService(IContaRepository contaRepository)
        {
            _contaRepository = contaRepository;
        }

        public async Task<int> AddAsync(ContaModel conta)
        {
            return await _contaRepository.AddAsync(conta);
        }

        public async Task<int> UpdateAsync(int id, ContaModel conta)
        {
            return await _contaRepository.UpdateAsync(id, conta);
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await _contaRepository.DeleteAsync(id);
        }

        public async Task<ContaModel> GetByIdAsync(int id)
        {
            return await _contaRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<ContaModel>> GetAllAsync(int usuarioId)
        {
            return await _contaRepository.GetAllAsync(usuarioId);
        }

        public async Task<IEnumerable<BancoModel>> GetBancosAsync()
        {
            return await _contaRepository.GetBancoAsync();
        }

        public async Task<IEnumerable<ContaModel>> GetByUsuarioIdAsync(int usuarioId)
        {
            return await _contaRepository.GetByUsuarioIdAsync(usuarioId);
        }
    }
}