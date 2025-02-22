import { TableColumnsType } from "antd";
import { AgenteFinanceiroType } from "../../Types/AgenteFinanceiroType";
import { Icons } from "../../components/IconPicker/Icons";

const columns: TableColumnsType<AgenteFinanceiroType> = [
  {
    title: "Id",
    dataIndex: "id",
    width: "auto",
    hidden: true,
    sorter: (a, b) => (a.id ?? 0) - (b.id ?? 0),
  },
  {
    title: "Descrição",
    dataIndex: "descricao",
    width: "auto",
    sorter: (a, b) => a.descricao.localeCompare(b.descricao),
  },
  {
    title: "Tipo",
    dataIndex: "idTipoAgenteFinanceiro",
    width: "auto",
    sorter: (a, b) => a.idTipoAgenteFinanceiro - b.idTipoAgenteFinanceiro,
    render: (value) => (value == 1 ? "Carteira" : "Conta Bancária"),
  },
  {
    title: "Banco",
    dataIndex: "bancoDescricao",
    width: "auto",
    sorter: (a, b) => a.bancoDescricao.localeCompare(b.bancoDescricao),
    render: (_, record) => (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: record.bancoCor,
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            color: "#fff"
          }}
        >
          {record.bancoLogo ? Icons[record.bancoLogo] : null}
        </div>
        {record.bancoDescricao}
      </div>
    ),
  },
  {
    title: "Agência",
    dataIndex: "agencia",
    width: "auto",
    sorter: (a, b) => (a.agencia ?? "") - (b.agencia ?? 0),
  },
  {
    title: "Dígito Agência",
    dataIndex: "digitoAgencia",
    width: "auto",
    sorter: (a, b) => (a.digitoAgencia ?? "") - (b.digitoAgencia ?? 0),
  },
  {
    title: "Conta",
    dataIndex: "conta",
    width: "auto",
    sorter: (a, b) => (a.conta ?? "") - (b.conta ?? 0),
  },
  {
    title: "Dígito Conta",
    dataIndex: "digitoConta",
    width: "auto",
    sorter: (a, b) => (a.digitoConta ?? "") - (b.digitoConta ?? 0),
  },
  {
    title: "Computa Saldo",
    dataIndex: "computaSaldo",
    width: "auto",
    sorter: (a, b) => Number(a.computaSaldo) - Number(b.computaSaldo),
    render: (value: boolean) => (value ? "Sim" : "Não"),
  },
  {
    title: "Ações",
    dataIndex: "action",
    align: "center",
  },
];

export default columns;