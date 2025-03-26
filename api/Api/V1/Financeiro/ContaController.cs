using Core.V1.Financeiro.Conta.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Core.V1.Financeiro.Conta.Models;

namespace Api.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ContaController : ControllerBase
    {
        private readonly IContaService _contaService;

        public ContaController(IContaService contaService)
        {
            _contaService = contaService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(ContaModel conta)
        {
            var userIdClaim = User.FindFirst("Id");
            if (userIdClaim == null)
            {
                return Unauthorized("Usuário não autenticado.");
            }
            var usuarioId = int.Parse(userIdClaim.Value);

            conta.UsuarioId = usuarioId;
            await _contaService.AddAsync(conta);
            return Ok(new { message = "Conta cadastrada com sucesso!" });
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, ContaModel conta)
        {
            var userIdClaim = User.FindFirst("Id");
            if (userIdClaim == null)
            {
                return Unauthorized("Usuário não autenticado.");
            }
            var usuarioId = int.Parse(userIdClaim.Value);

            conta.UsuarioId = usuarioId;
            if (id == 0)
                return BadRequest("Informe um Id de Conta válido.");

            await _contaService.UpdateAsync(id, conta);
            return Ok(new { message = "Conta alterada com sucesso!" });
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _contaService.DeleteAsync(id);
            return Ok(new { message = "Conta deletada com sucesso!" });
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            var userIdClaim = User.FindFirst("Id");
            if (userIdClaim == null)
            {
                return Unauthorized("Usuário não autenticado.");
            }
            var usuarioId = int.Parse(userIdClaim.Value);

            var contas = await _contaService.GetAllAsync(usuarioId);
            return Ok(contas);
        }

        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var conta = await _contaService.GetByIdAsync(id);
            if (conta == null)
                return NotFound("Conta não encontrada.");

            return Ok(conta);
        }

        [HttpGet("getBancos")]
        public async Task<IActionResult> GetBancos()
        {
            var bancos = await _contaService.GetBancosAsync();
            return Ok(bancos);
        }
    }
}