import React, { FC, useState } from "react";
import { Modal, Button, Form } from "antd";
import { InputStyled } from "../../../../../../../Styles";
import {
  useApiContext,
  useEcosystemContext,
} from "../../../../../../../../context";
import { IEditEcosystemProps } from "../EditEcosystemModal";
import { ISubEcosystem } from "../../../../../../../../context/Ecosystem/types";

export type IAddSubClassProps = {
  currSubEcosystem: ISubEcosystem;
} & IEditEcosystemProps;

const AddSubClassModal: FC<IAddSubClassProps> = ({
  visible,
  closeModal,
  currEcosystem,
  currSubEcosystem,
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
        sub_ecosystem: currSubEcosystem.id,
      });

      console.log(res);

      if (res.status === 201) {
        refetchEcosystems();

        Modal.success({
          title: "Sub-Class added successfully.",
          onOk: () => closeModal(),
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
      title={<strong>Add Sub-Class</strong>}
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
          label="Name of Sub-Class"
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

export default AddSubClassModal;
