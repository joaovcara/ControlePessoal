import Pagina from "../../Layout/Pagina/Pagina";
import { BankOutlined } from "@ant-design/icons";
import { useEffect, useState, useCallback } from "react";
import { AgenteFinanceiroType } from "../../Types/AgenteFinanceiroType";
import { useLoading } from "../../contexts/PaginaContext";
import columns from "./AgenteFinanceiroData";
import TableActions from "../../components/Table/TableActions";
import ModalConfirm from "../../components/Modal/ModalConfirm";
import { useAgenteFinanceiro } from "../../contexts/AgenteFinanceiroContext";
import AgenteFinanceiroForm from "./AgenteFinanceiroForm";
import { handleDownloadCSV } from "../../utils/ExportToCsv";

export default function AgenteFinanceiro() {
  const { getAll, delete: deleteAgenteFinanceiro } = useAgenteFinanceiro();
  const { setLoading } = useLoading();
  const [agentesFinanceiros, setAgentesFinanceiros] = useState<AgenteFinanceiroType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgenteFinanceiro, setEditingAgenteFinanceiro] = useState<AgenteFinanceiroType | undefined>(undefined);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [agenteFinanceiroToDelete, setAgenteFinanceiroToDelete] = useState<AgenteFinanceiroType | undefined>(undefined);

  const fetchAgentesFinanceiros = useCallback(async () => {
    setLoading(true);
    const agentesfinanceiros = await getAll();
    const formattedAgentesFinanceiros = agentesfinanceiros.map((agenteFinanceiro: AgenteFinanceiroType) => ({
      key: agenteFinanceiro.id,
      id: agenteFinanceiro.id,
      descricao: agenteFinanceiro.descricao,
      idTipoAgenteFinanceiro: agenteFinanceiro.idTipoAgenteFinanceiro,
      idBanco: agenteFinanceiro.idBanco,
      bancoDescricao: agenteFinanceiro.bancoDescricao,
      bancoLogo: agenteFinanceiro.bancoLogo,
      bancoCor: agenteFinanceiro.bancoCor,
      agencia: agenteFinanceiro.agencia,
      digitoAgencia: agenteFinanceiro.digitoAgencia,
      conta: agenteFinanceiro.conta,
      digitoConta: agenteFinanceiro.digitoConta,
      computaSaldo: agenteFinanceiro.computaSaldo,
    }));
    setAgentesFinanceiros(formattedAgentesFinanceiros);
    setLoading(false);
  }, [getAll, setLoading]);

  useEffect(() => {
    fetchAgentesFinanceiros();
  }, [fetchAgentesFinanceiros]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingAgenteFinanceiro(undefined);
    fetchAgentesFinanceiros();
  };

  const handleEdit = (agenteFinanceiro: AgenteFinanceiroType) => {
    setEditingAgenteFinanceiro(agenteFinanceiro);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteAgenteFinanceiro(id);
    fetchAgentesFinanceiros();
  };

  const handleConfirmDelete = (agenteFinanceiro: AgenteFinanceiroType) => {
    setAgenteFinanceiroToDelete(agenteFinanceiro);
    setIsModalConfirmOpen(true);
  };

  const handleCancelDelete = () => {
    setAgenteFinanceiroToDelete(undefined);
    setIsModalConfirmOpen(false);
  };

  const handleConfirmDeleteModal = async () => {
    if (agenteFinanceiroToDelete) {
      await handleDelete(agenteFinanceiroToDelete.id!);
      setIsModalConfirmOpen(false);
    }
  };

  const handleDownload = () => {
    handleDownloadCSV(agentesFinanceiros, columns, "AgenteFinanceiro");
  };

  return (
    <>
      <Pagina<AgenteFinanceiroType>
        pageTitle="Agente Financeiro"
        pageIcon={<BankOutlined />}
        dataSource={agentesFinanceiros}
        columns={columns.map((col) => {
          if ('dataIndex' in col && col.dataIndex === "action") {
            return {
              ...col,
              render: (_, record) => (
                <TableActions
                  onEdit={() => handleEdit(record)}
                  onDelete={() => handleConfirmDelete(record)}
                  onPrint={() => alert(`Imprimir dados do Agente Financeiro ${record.id}`)}
                  actions={["edit", "delete"]}
                />
              ),
            };
          }
          return col;
        })}
        tituloAcaoIncluir="Cadastro de Agente Financeiro"
        formulario={<AgenteFinanceiroForm onClose={handleModalClose} initialValues={editingAgenteFinanceiro} />}
        isModalOpen={isModalOpen}
        setIsModalOpen={(open) => {
          if (!open) {
            setEditingAgenteFinanceiro(undefined);
          }
          setIsModalOpen(open);
        }}
        modalWidth="30%"
        onDownload={handleDownload}
      />
      <ModalConfirm
        title="Deletar Agente Financeiro"
        visible={isModalConfirmOpen}
        onConfirm={handleConfirmDeleteModal}
        onCancel={handleCancelDelete}
        text={"Deseja realmente deletar esta Agente Financeiro " + (agenteFinanceiroToDelete?.descricao ?? "") + "?"} 
      />
    </>
  );
}