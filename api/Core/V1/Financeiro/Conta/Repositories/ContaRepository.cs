using System.Data;
using System.Data.SqlClient;
using Dapper;
using Microsoft.Extensions.Configuration;
using Core.V1.Financeiro.Conta.Models;
using Core.V1.Financeiro.Conta.Interfaces.Repositories;
using Core.V1.Financeiro.Banco.Models;

namespace Core.V1.Financeiro.Conta.Repositories
{
    public class ContaRepository : IContaRepository
    {
        private readonly string _connectionString;
        const string _databaseName = "dbo.Conta";

        public ContaRepository(IConfiguration configuration)
        {
            _connectionString = configuration?.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("A string de conexão 'DefaultConnection' não foi encontrada ou está vazia nas configurações.");
        }

        public async Task<int> AddAsync(ContaModel conta)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                var sql = $@"INSERT INTO {_databaseName} (Descricao, IdTipoConta, IdBanco, Agencia, DigitoAgencia, Conta, DigitoConta, ComputaSaldo)
                             VALUES (@Descricao, @IdTipoConta, @IdBanco, @Agencia, @DigitoAgencia, @Conta, @DigitoConta, @ComputaSaldo)";
                return await db.ExecuteAsync(sql, conta);
            }
        }

        public async Task<int> UpdateAsync(int id, ContaModel conta)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                var sql = $@"UPDATE {_databaseName} 
                             SET Descricao = @Descricao,
                                 IdTipoConta = @IdTipoConta,
                                 IdBanco = @IdBanco,
                                 Agencia = @Agencia,
                                 DigitoAgencia = @DigitoAgencia,
                                 Conta = @Conta,
                                 DigitoConta = @DigitoConta,
                                 ComputaSaldo = @ComputaSaldo
                             WHERE Id = @Id";
                return await db.ExecuteAsync(sql,
                    new
                    {
                        conta.Descricao,
                        conta.IdTipoConta,
                        conta.IdBanco,
                        conta.Agencia,
                        conta.DigitoAgencia,
                        conta.Conta,
                        conta.DigitoConta,
                        conta.ComputaSaldo,
                        Id = id
                    });
            }
        }

        public async Task<int> DeleteAsync(int id)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                var sql = $@"DELETE FROM {_databaseName} WHERE Id = @Id";
                return await db.ExecuteAsync(sql, new { Id = id });
            }
        }

        public async Task<ContaModel> GetByIdAsync(int id)
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                var sql = $@"SELECT * FROM {_databaseName} WHERE Id = @Id";
                var result = await db.QueryFirstOrDefaultAsync<ContaModel>(sql, new { Id = id });
                if (result == null)
                {
                    throw new KeyNotFoundException($"Conta com Id {id} não encontrado.");
                }
                return result;
            }
        }

        public async Task<IEnumerable<ContaModel>> GetAllAsync()
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                var sql = $@"SELECT dbo.Conta.*,
                                    dbo.Banco.Descricao AS BancoDescricao,
                                    dbo.Banco.Cor       AS BancoCor
                             FROM {_databaseName}
                             LEFT JOIN dbo.Banco ON dbo.Banco.Id = dbo.Conta.IdBanco";
                return await db.QueryAsync<ContaModel>(sql);
            }
        }

        public async Task<IEnumerable<BancoModel>> GetBancoAsync()
        {
            using (IDbConnection db = new SqlConnection(_connectionString))
            {
                var sql = $@"SELECT * FROM dbo.Banco";
                return await db.QueryAsync<BancoModel>(sql);
            }
        }
    }
}