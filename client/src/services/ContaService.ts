import { ContaType } from "../Types/ContaType";
import { BancoType } from "../Types/BancoType";
import Api from "./Api";

/**
 * Função de Cadastro de conta
 * @param conta
 * @returns
 */
export const Create = async (conta: ContaType): Promise<ContaType> => {
  try {
    const response = await Api.post("/Conta/create", conta);
    return response.data.token;
  } catch (error) {
    throw new Error("Erro ao criar conta: " + error);
  }
};

/**
 * Função de atualização de conta
 * @param conta
 * @returns
 */
export const Update = async (conta: ContaType): Promise<string> => {
  try {
    const response = await Api.put(`/Conta/update/${conta.id}`, conta );
    return response.data.token;
  } catch (error) {
    throw new Error("Erro ao criar conta: " + error);
  }
};

/**
 * Função de delete de conta
 * @param id
 * @returns
 */
export const Delete = async (id: number): Promise<unknown> => {
  try {
    const response = await Api.delete(`/Conta/delete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao recuperar contas: " + error);
  }
};

/**
 * Função de buscar todas contas
 * @returns
 */
export const GetAll = async (): Promise<ContaType[]> => {
  try {
    const response = await Api.get("/Conta/getAll");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao recuperar contas: " + error);
  }
};

/**
 * Função de buscar todas contas por tipo de conta
 * @returns
 */
export const GetAllByTipoConta = async (tipoConta: number): Promise<ContaType[]> => {
  try {
    const response = await Api.get(`/Conta/getAllByTipoConta/${tipoConta}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao recuperar contas: " + error);
  }
};

/**
 * Função de buscar todos bancos
 * @returns
 */
export const GetBancos = async (): Promise<BancoType[]> => {
  try {
    const response = await Api.get("/Conta/GetBancos");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao recuperar bancos: " + error);
  }
};

/**
 * Função de buscar conta por id
 * @param id
 * @returns
 */
export const GetById = async (id: number): Promise<ContaType> => {
  try {
    const response = await Api.get(`/Conta/getById/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao recuperar conta: " + error);
  }
};
