export interface ContaType {
  id?: number;
  descricao: string;
  idTipoConta: number;
  idBanco: number;
  bancoDescricao: string;
  bancoCor: string;
  agencia: number;
  digitoAgencia: number;
  conta: number;
  digitoConta: number;
  computaSaldo: boolean;
}