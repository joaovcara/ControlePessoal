import { createContext, useContext, ReactNode } from "react";
import { ContaType } from "../Types/ContaType";
import { Create, Delete, GetAll, GetAllByTipoConta, GetBancos, Update } from "../services/ContaService";
import { notification } from "antd";
import { BancoType } from "../Types/BancoType";

interface ContaContextProps {
  create: (conta: ContaType) => Promise<boolean>;
  getAll: () => Promise<ContaType[]>;
  update: (conta: ContaType) => Promise<boolean>;
  delete: (id: number) => Promise<boolean>;
  getAllByTipoConta: (tipoConta: number) => Promise<ContaType[]>;
  getBancos: () => Promise<BancoType[]>;
}

const ContaContext = createContext<ContaContextProps | undefined>(undefined);

export const ContaProvider = ({ children }: { children: ReactNode }) => {
  // Função de criar Conta
  const create = async (conta: ContaType): Promise<boolean> => {
    try {
      await Create(conta);
      notification.success({
        message: "Sucesso",
        description: "Conta criada com sucesso",
      });
      return true;
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao criar conta!",
      });
      return false;
    }
  };

  // Função para recuperar contas
  const getAll = async (): Promise<ContaType[]> => {
    try {
      const data = await GetAll();
      return data;
    } catch (error) {
      console.error("Erro ao recuperar contas:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao recuperar contas!",
      });
      return []; // Retorna uma lista vazia em caso de erro
    }
  };

  // Função para recuperar contas
  const getAllByTipoConta = async (
    tipoConta: number
  ): Promise<ContaType[]> => {
    try {
      const data = await GetAllByTipoConta(tipoConta);
      return data;
    } catch (error) {
      console.error("Erro ao recuperar contas:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao recuperar contas!",
      });
      return []; // Retorna uma lista vazia em caso de erro
    }
  };

  // Função de atualizar conta
  const update = async (conta: ContaType): Promise<boolean> => {
    try {
      await Update(conta);
      notification.success({
        message: "Sucesso",
        description: "Conta atualizada com sucesso",
      });
      return true;
    } catch (error) {
      console.error("Erro ao atualizar Conta:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao atualizar Conta!",
      });
      return false;
    }
  };

  // Função de deletar conta
  const deletecategoria = async (id: number): Promise<boolean> => {
    try {
      await Delete(id);
      notification.success({
        message: "Sucesso",
        description: "Conta deletada com sucesso",
      });
      return true;
    } catch (error) {
      console.error("Erro ao deletar Conta:", error);
      notification.error({
        message: "Erro",
        description: "Erro ao deletar Conta!",
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
    <ContaContext.Provider
      value={{ create, getAll, update, delete: deletecategoria, getAllByTipoConta, getBancos }}
    >
      {children}
    </ContaContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useConta = () => {
  const context = useContext(ContaContext);
  if (!context) {
    throw new Error(
      "useConta deve ser usado dentro de um contaProvider"
    );
  }
  return context;
};