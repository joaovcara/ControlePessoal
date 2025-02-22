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
  Col,
} from "antd";
import { ClearOutlined } from "@ant-design/icons";
import { AgenteFinanceiroType } from "../../Types/AgenteFinanceiroType";
import { useAgenteFinanceiro } from "../../contexts/AgenteFinanceiroContext";
import { BancoType } from "../../Types/BancoType";

const { Text } = Typography;

interface AgenteFinanceiroFormProps {
  onClose: () => void;
  initialValues?: AgenteFinanceiroType;
}

const AgenteFinanceiroForm: React.FC<AgenteFinanceiroFormProps> = ({
  onClose,
  initialValues,
}) => {
  const [form] = Form.useForm<AgenteFinanceiroType>();
  const { create, update, getBancos } = useAgenteFinanceiro();
  const [tipo, setTipo] = useState<number | undefined>(initialValues?.idTipoAgenteFinanceiro);
  const [bancos, setBancos] = useState<BancoType[]>([]);

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
      setTipo(initialValues.idTipoAgenteFinanceiro);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const onSubmit: FormProps<AgenteFinanceiroType>["onFinish"] = async (values) => {
    let valid = true;

    try {
      await form.validateFields(["descricao", "idTipoAgenteFinanceiro"]);
    } catch (error) {
      valid = false;
    }

    if (!valid) return;

    const success = initialValues
      ? await update({ ...values })
      : await create({ ...values });

    if (success) {
      form.resetFields();
      onClose();
    }
  };

  const handleLimpar = () => {
    form.resetFields();
  };

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
      <Form.Item<AgenteFinanceiroType> label="Descrição" name="descricao" rules={[{ required: true, message: "Digite a descrição!" }]} required={false}>
        <Input placeholder="Descrição da conta" />
      </Form.Item>

      <Form.Item<AgenteFinanceiroType> label="Tipo" name="idTipoAgenteFinanceiro" rules={[{ required: true, message: "Selecione o tipo!" }]} required={false}>
        <Select placeholder="Selecione um tipo" onChange={(value) => setTipo(value)}>
          <Select.Option value={1}>Carteira</Select.Option>
          <Select.Option value={2}>Banco</Select.Option>
        </Select>
      </Form.Item>

      {tipo === 2 && (
        <>
          <Form.Item<AgenteFinanceiroType> label="Banco" name="idBanco">
            <Select placeholder="Selecione um banco">
              {bancos.map((banco) => (
                <Select.Option key={banco.id} value={banco.id}>
                  {banco.descricao}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item<AgenteFinanceiroType> label="Agência" name="agencia" required={false}>
                <Input placeholder="Agência" inputMode="numeric" pattern="[0-9]*" onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item<AgenteFinanceiroType> label=" " name="digitoAgencia" required={false}>
                <Input placeholder="Dígito" inputMode="numeric" pattern="[0-9]*" onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<AgenteFinanceiroType> label="Conta" name="conta" required={false}>
                <Input placeholder="Conta" inputMode="numeric" pattern="[0-9]*" onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item<AgenteFinanceiroType> label=" " name="digitoConta" required={false}>
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

      <Form.Item<AgenteFinanceiroType> name="computaSaldo" valuePropName="checked">
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

export default AgenteFinanceiroForm;