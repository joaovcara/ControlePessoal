import { AgenteFinanceiroType } from "../Types/AgenteFinanceiroType";
import { BancoType } from "../Types/BancoType";
import Api from "./Api";

/**
 * Função de Cadastro de agente financeiro
 * @param agenteFinanceiro
 * @returns
 */
export const Create = async (agenteFinanceiro: AgenteFinanceiroType): Promise<AgenteFinanceiroType> => {
  try {
    const response = await Api.post("/AgenteFinanceiro/create", agenteFinanceiro);
    return response.data.token;
  } catch (error) {
    throw new Error("Erro ao criar agente financeiro: " + error);
  }
};

/**
 * Função de atualização de agente  financeiro
 * @param agenteFinanceiro
 * @returns
 */
export const Update = async (agenteFinanceiro: AgenteFinanceiroType): Promise<string> => {
  try {
    const response = await Api.put(`/AgenteFinanceiro/update/${agenteFinanceiro.id}`, agenteFinanceiro );
    return response.data.token;
  } catch (error) {
    throw new Error("Erro ao criar agente financeiro: " + error);
  }
};

/**
 * Função de delete de agente financeiro
 * @param id
 * @returns
 */
export const Delete = async (id: number): Promise<unknown> => {
  try {
    const response = await Api.delete(`/AgenteFinanceiro/delete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao recuperar agentes financeiros: " + error);
  }
};

/**
 * Função de buscar todas agentes financeiros
 * @returns
 */
export const GetAll = async (): Promise<AgenteFinanceiroType[]> => {
  try {
    const response = await Api.get("/AgenteFinanceiro/getAll");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao recuperar agentes financeiros: " + error);
  }
};

/**
 * Função de buscar todas agentes financeiros por tipo de agente financeiro
 * @returns
 */
export const GetAllByTipoAgenteFinanceiro = async (tipoAgenteFinanceiro: number): Promise<AgenteFinanceiroType[]> => {
  try {
    const response = await Api.get(`/AgenteFinanceiro/getAllByTipoAgenteFinanceiro/${tipoAgenteFinanceiro}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao recuperar agentes financeiros: " + error);
  }
};

/**
 * Função de buscar todos bancos
 * @returns
 */
export const GetBancos = async (): Promise<BancoType[]> => {
  try {
    const response = await Api.get("/AgenteFinanceiro/GetBancos");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao recuperar bancos: " + error);
  }
};

/**
 * Função de buscar agenteFinanceiro por id
 * @param id
 * @returns
 */
export const GetById = async (id: number): Promise<AgenteFinanceiroType> => {
  try {
    const response = await Api.get(`/AgenteFinanceiro/getById/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao recuperar agenteFinanceiro: " + error);
  }
};
