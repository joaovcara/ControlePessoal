import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Space,
  Tooltip,
  Typography,
  Row,
  Col
} from "antd";
import { ClearOutlined } from "@ant-design/icons";
import { ContaType } from "../../Types/ContaType";
import { useConta } from "../../contexts/ContaContext";
import { BancoType } from "../../Types/BancoType";
import { Icons } from "../../components/IconPicker/Icons";

const { Text } = Typography;

interface ContaFormProps {
  onClose: () => void;
  initialValues?: ContaType;
}

const ContaForm: React.FC<ContaFormProps> = ({
  onClose,
  initialValues,
}) => {
  const [form] = Form.useForm<ContaType>();
  const { create, update, getBancos } = useConta();
  const [tipo, setTipo] = useState<number | undefined>(initialValues?.idTipoConta);
  const [bancos, setBancos] = useState<BancoType[]>([]);
  const [corBanco, setCorBanco] = useState<string | undefined>(initialValues?.bancoCor);

  console.log("initialValues", initialValues);
  useEffect(() => {
    const fetchCategorias = async () => {
      const bancos = await getBancos();
      setBancos(bancos);
    };

    fetchCategorias();
  }, [tipo == 2]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setTipo(initialValues.idTipoConta);
      setCorBanco(initialValues.bancoCor);
    } else {
      form.resetFields();
      setCorBanco(undefined);
      setTipo(undefined);
    }
  }, [initialValues, form]);

  useEffect(() => {
    if (tipo === 1) {
      setCorBanco("");
    }
  }, [tipo]);

  const onSubmit: FormProps<ContaType>["onFinish"] = async (values) => {
    let valid = true;

    try {
      await form.validateFields(["descricao", "idTipoConta"]);
    } catch (error) {
      valid = false;
    }

    if (!valid) return;

    const success = initialValues
      ? await update({ ...values })
      : await create({ ...values });

    if (success) {
      form.resetFields();
      setCorBanco(undefined);
      onClose();
    }
  };

  const handleLimpar = () => {
    form.resetFields();
    setCorBanco(undefined);
  };

  console.log("ContaForm.tsx", tipo); 

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      autoComplete="off"
      initialValues={{ ativo: true }}
      style={{
        width: "100%",
      }}
    >
      <Form.Item<ContaType> label="Descrição" name="descricao" rules={[{ required: true, message: "Digite a descrição!" }]} required={false}>
        <Input placeholder="Descrição da conta" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={2}>
          <Form.Item<ContaType> label=" " name="bancoCor" style={{ marginBottom: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: tipo === 1 ? "#46100e" : corBanco,
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  color: "#fff"
                }}
              >
                {tipo === 1 ? Icons["Carteira"] : tipo === 2 ? Icons["Banco"] : null}
              </div>
            </div>
          </Form.Item>
        </Col>
        <Col span={22}>
          <Form.Item<ContaType> label="Tipo" name="idTipoConta" rules={[{ required: true, message: "Selecione o tipo!" }]} required={false}>
            <Select placeholder="Selecione um tipo" onChange={(value) => setTipo(value)}>
              <Select.Option value={1}>Carteira</Select.Option>
              <Select.Option value={2}>Banco</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {tipo === 2 && (
        <>
          <Form.Item<ContaType> label="Banco" name="idBanco">
            <Select placeholder="Selecione um banco" onChange={(value) => {
              const selectedBanco = bancos.find(banco => banco.id === value);
              setCorBanco(selectedBanco?.cor);
            }}>
              {bancos.map((banco) => (
                <Select.Option key={banco.id} value={banco.id}>
                  {banco.descricao}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item<ContaType> label="Agência" name="agencia" required={false}>
                <Input placeholder="Agência" inputMode="numeric" pattern="[0-9]*" onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item<ContaType> label=" " name="digitoAgencia" required={false}>
                <Input placeholder="Dígito" inputMode="numeric" pattern="[0-9]*" onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<ContaType> label="Conta" name="conta" required={false}>
                <Input placeholder="Conta" inputMode="numeric" pattern="[0-9]*" onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item<ContaType> label=" " name="digitoConta" required={false}>
                <Input placeholder="Dígito" inputMode="numeric" pattern="[0-9]*" onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }} />
              </Form.Item>
            </Col>
          </Row>
        </>
      )}

      <Form.Item<ContaType> name="computaSaldo" valuePropName="checked">
        <Checkbox>Computa Saldo Tela Inicial?</Checkbox>
      </Form.Item>

      <Form.Item>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Form.Item name="id" style={{ margin: 0 }}>
            <Text type="secondary" style={{ display: "block", textAlign: "center" }}>
              ID: {initialValues?.id}
            </Text>
          </Form.Item>
          <Space>
            <Tooltip title="Limpar campos">
              <Button icon={<ClearOutlined />} onClick={handleLimpar} />
            </Tooltip>
            <Tooltip title="Salvar conta">
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Tooltip>
          </Space>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default ContaForm;