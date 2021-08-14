import React, { FC, useState } from "react";
import { Button, Form, Modal } from "antd";
import { InputStyled } from "../../../../../../../Styles";
import { IEditEcosystemProps } from "../EditEcosystemModal";
import {
  useApiContext,
  useEcosystemContext,
} from "../../../../../../../../context";
import { ISubEcosystem } from "../../../../../../../../context/Ecosystem/types";

export type IEditSubEcosystemProps = {
  currSubEcosystem: ISubEcosystem;
} & IEditEcosystemProps;

const EditSubEcosystemModal: FC<IEditSubEcosystemProps> = ({
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

      const res = await api.editSubEcosystem(currEcosystem.id, {
        ...values,
        ecosystem: currEcosystem.id,
      });

      if (res.status === 201) {
        setIsLoading(false);
        refetchEcosystems();
        Modal.success({
          title: "Sub-Ecosystem edited successfully",
          onOk: () => closeModal(),
        });
      }
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

  return (
    <Modal
      title={<strong>Edit Sub-Ecosystem</strong>}
      visible={visible}
      onCancel={closeModal}
      footer={[
        <Button key="cancel" onClick={() => closeModal()}>
          Cancel
        </Button>,
        <Button
          loading={isLoading}
          key="create"
          type="primary"
          onClick={() => handleSubmit()}
        >
          Edit
        </Button>,
      ]}
      destroyOnClose
    >
      <Form
        form={form}
        initialValues={{
          name: currSubEcosystem.name,
        }}
      >
        <Form.Item
          name="name"
          rules={[
            { message: "Please input sub-ecosystem name!", required: true },
          ]}
        >
          <InputStyled placeholder="Name of Sub-Ecosystem" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditSubEcosystemModal;
