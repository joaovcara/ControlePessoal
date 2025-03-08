import Pagina from "../../Layout/Pagina/Pagina";
import { BankOutlined } from "@ant-design/icons";
import { useEffect, useState, useCallback } from "react";
import { ContaType } from "../../Types/ContaType";
import { useLoading } from "../../contexts/PaginaContext";
import columns from "./ContaData";
import TableActions from "../../components/Table/TableActions";
import ModalConfirm from "../../components/Modal/ModalConfirm";
import { useConta } from "../../contexts/ContaContext";
import ContaForm from "./ContaForm";
import { handleDownloadCSV } from "../../utils/ExportToCsv";

export default function Conta() {
  const { getAll, delete: deleteConta } = useConta();
  const { setLoading } = useLoading();
  const [contas, setContas] = useState<ContaType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConta, setEditingConta] = useState<ContaType | undefined>(undefined);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
  const [contaToDelete, setContaToDelete] = useState<ContaType | undefined>(undefined);

  const fetchContas = useCallback(async () => {
    setLoading(true);
    const contas = await getAll();
    const formattedContas = contas.map((conta: ContaType) => ({
      key: conta.id,
      id: conta.id,
      descricao: conta.descricao,
      idTipoConta: conta.idTipoConta,
      idBanco: conta.idBanco,
      bancoDescricao: conta.bancoDescricao,
      bancoCor: conta.bancoCor,
      agencia: conta.agencia,
      digitoAgencia: conta.digitoAgencia,
      conta: conta.conta,
      digitoConta: conta.digitoConta,
      computaSaldo: conta.computaSaldo,
    }));

    // Ordenar inicialmente por tipo e depois por descrição
    formattedContas.sort((a, b) => {
      if (a.idTipoConta !== b.idTipoConta) {
        return a.idTipoConta - b.idTipoConta;
      }
      return a.descricao.localeCompare(b.descricao);
    });
    setContas(formattedContas);
    setLoading(false);
  }, [getAll, setLoading]);

  useEffect(() => {
    fetchContas();
  }, [fetchContas]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingConta(undefined);
    fetchContas();
  };

  const handleEdit = (conta: ContaType) => {
    setEditingConta(conta);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteConta(id);
    fetchContas();
  };

  const handleConfirmDelete = (conta: ContaType) => {
    setContaToDelete(conta);
    setIsModalConfirmOpen(true);
  };

  const handleCancelDelete = () => {
    setContaToDelete(undefined);
    setIsModalConfirmOpen(false);
  };

  const handleConfirmDeleteModal = async () => {
    if (contaToDelete) {
      await handleDelete(contaToDelete.id!);
      setIsModalConfirmOpen(false);
    }
  };

  const handleDownload = () => {
    handleDownloadCSV(contas, columns, "Conta");
  };

  return (
    <>
      <Pagina<ContaType>
        pageTitle="Contas"
        pageIcon={<BankOutlined />}
        dataSource={contas}
        columns={columns.map((col) => {
          if ('dataIndex' in col && col.dataIndex === "idTipoConta") {
            return {
              ...col,
              sorter: (a, b) => a.idTipoConta - b.idTipoConta,
            };
          }
          if ('dataIndex' in col && col.dataIndex === "descricao") {
            return {
              ...col,
              sorter: (a, b) => a.descricao.localeCompare(b.descricao),
            };
          }
          if ('dataIndex' in col && col.dataIndex === "action") {
            return {
              ...col,
              render: (_, record) => (
                <TableActions
                  onEdit={() => handleEdit(record)}
                  onDelete={() => handleConfirmDelete(record)}
                  onPrint={() => alert(`Imprimir dados do Conta ${record.id}`)}
                  actions={["edit", "delete"]}
                />
              ),
            };
          }
          return col;
        })}
        tituloAcaoIncluir="Cadastro de Conta"
        formulario={<ContaForm onClose={handleModalClose} initialValues={editingConta} />}
        isModalOpen={isModalOpen}
        setIsModalOpen={(open) => {
          if (!open) {
            setEditingConta(undefined);
          }
          setIsModalOpen(open);
        }}
        modalWidth="30%"
        onDownload={handleDownload}
      />
      <ModalConfirm
        title="Deletar Conta"
        visible={isModalConfirmOpen}
        onConfirm={handleConfirmDeleteModal}
        onCancel={handleCancelDelete}
        text={"Deseja realmente deletar esta Conta " + (contaToDelete?.descricao ?? "") + "?"}
      />
    </>
  );
}