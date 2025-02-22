export interface AgenteFinanceiroType {
  id?: number;
  descricao: string;
  idTipoAgenteFinanceiro: number;
  idBanco: number;
  bancoDescricao: string;
  bancoLogo: string;
  bancoCor: string;
  agencia: number;
  digitoAgencia: number;
  conta: number;
  digitoConta: number;
  computaSaldo: boolean;
}