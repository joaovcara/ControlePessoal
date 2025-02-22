import { createContext, useContext, ReactNode } from "react";
import { AgenteFinanceiroType } from "../Types/AgenteFinanceiroType";
import { Create, GetAll, Update, Delete, GetAllByTipoAgenteFinanceiro, GetBancos } from "../services/AgenteFinanceiroService";
import { notification } from "antd";
import { BancoType } from "../Types/BancoType";

interface AgenteFinanceiroContextProps {
  create: (agenteFinanceiro: AgenteFinanceiroType) => Promise<boolean>;
  getAll: () => Promise<AgenteFinanceiroType[]>;
  update: (agenteFinanceiro: AgenteFinanceiroType) => Promise<boolean>;
  delete: (id: number) => Promise<boolean>;
  getAllByTipoAgenteFinanceiro: (tipoAgenteFinanceiro: number) => Promise<AgenteFinanceiroType[]>;
  getBancos: () => Promise<BancoType[]>;
}

const AgenteFinanceiroContext = createContext<AgenteFinanceiroContextProps | undefined>(undefined);

export const AgenteFinanceiroProvider = ({ children }: { children: ReactNode }) => {
  // Função de criar agente financeiro
  const create = async (agenteFinanceiro: AgenteFinanceiroType): Promise<boolean> => {
    try {
      await Create(agenteFinanceiro);
      notification.success({
        message: "Sucesso",
        description: "Agente Financeiro criada com sucesso",
      });
      return true;
    } catch (error) {
      console.error("Erro ao criar agenteFinanceiro:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao criar agenteFinanceiro!",
      });
      return false;
    }
  };

  // Função para recuperar agentes financeiros
  const getAll = async (): Promise<AgenteFinanceiroType[]> => {
    try {
      const data = await GetAll();
      return data;
    } catch (error) {
      console.error("Erro ao recuperar agentes financeiros:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao recuperar agentes financeiros!",
      });
      return []; // Retorna uma lista vazia em caso de erro
    }
  };

  // Função para recuperar agentes financeiros
  const getAllByTipoAgenteFinanceiro = async (
    tipoAgenteFinanceiro: number
  ): Promise<AgenteFinanceiroType[]> => {
    try {
      const data = await GetAllByTipoAgenteFinanceiro(tipoAgenteFinanceiro);
      return data;
    } catch (error) {
      console.error("Erro ao recuperar agentes financeiros:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao recuperar agentes financeiros!",
      });
      return []; // Retorna uma lista vazia em caso de erro
    }
  };

  // Função de atualizar agenteFinanceiro
  const update = async (agenteFinanceiro: AgenteFinanceiroType): Promise<boolean> => {
    try {
      await Update(agenteFinanceiro);
      notification.success({
        message: "Sucesso",
        description: "Agente Financeiro atualizada com sucesso",
      });
      return true;
    } catch (error) {
      console.error("Erro ao atualizar agente financeiro:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao atualizar agente financeiro!",
      });
      return false;
    }
  };

  // Função de deletar agenteFinanceiro
  const deletecategoria = async (id: number): Promise<boolean> => {
    try {
      await Delete(id);
      notification.success({
        message: "Sucesso",
        description: "Agente financeiro deletada com sucesso",
      });
      return true;
    } catch (error) {
      console.error("Erro ao deletar agente financeiro:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao deletar agente financeiro!",
      });
      return false;
    }
  };

  // Função para recuperar bancos
  const getBancos = async (): Promise<BancoType[]> => {
    try {
      const data = await GetBancos();
      return data;
    } catch (error) {
      console.error("Erro ao recuperar bancos:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao recuperar bancos!",
      });
      return []; // Retorna uma lista vazia em caso de erro
    }
  };


  return (
    <AgenteFinanceiroContext.Provider
      value={{ create, getAll, update, delete: deletecategoria, getAllByTipoAgenteFinanceiro, getBancos }}
    >
      {children}
    </AgenteFinanceiroContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAgenteFinanceiro = () => {
  const context = useContext(AgenteFinanceiroContext);
  if (!context) {
    throw new Error(
      "useAgenteFinanceiro deve ser usado dentro de um agenteFinanceiroProvider"
    );
  }
  return context;
};