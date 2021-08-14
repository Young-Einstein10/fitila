import React, { FC, useState } from "react";
import { Modal, Button, Form } from "antd";
import { IEcosystemProps } from "../../../../../../../../context/Ecosystem/types";
import {
  useApiContext,
  useEcosystemContext,
} from "../../../../../../../../context";
import { InputStyled } from "../../../../../../../Styles";

interface ISubEcosystemProps {
  visible: boolean;
  closeModal: () => void;
  currEcosystem: IEcosystemProps;
}

const AddSubEcosystemModal: FC<ISubEcosystemProps> = ({
  visible,
  closeModal,
  currEcosystem,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const { ecosystem: api } = useApiContext();
  const { refetchEcosystems } = useEcosystemContext();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      setIsLoading(true);

      const res = await api.addSubEcosystem({
        ...values,
        ecosystem: currEcosystem.id,
      });

      console.log(res);

      if (res.status === 201) {
        Modal.success({
          title: "Sub-Ecosystem added successfully.",
          onOk: async () => {
            await refetchEcosystems();
            closeModal();
          },
        });
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

  return (
    <Modal
      title={<strong>Add Sub-Ecosystem</strong>}
      visible={visible}
      onCancel={closeModal}
      footer={[
        <Button key="cancel" onClick={closeModal}>
          Cancel
        </Button>,
        <Button
          loading={isLoading}
          key="create"
          type="primary"
          onClick={() => handleSubmit()}
        >
          Add
        </Button>,
      ]}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name of Ecosystem"
          rules={[
            { message: "Please input sub-ecosystem name!", required: true },
          ]}
        >
          <InputStyled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddSubEcosystemModal;
