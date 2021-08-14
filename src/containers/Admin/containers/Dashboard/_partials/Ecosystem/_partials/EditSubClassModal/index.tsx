import React, { FC, useState } from "react";
import { Button, Form, Modal } from "antd";
import { ISubclassProps } from "../../../../../../../../context/Ecosystem/types";
import { IEditSubEcosystemProps } from "../EditSubEcosystemModal";
import { InputStyled } from "../../../../../../../Styles";
import {
  useApiContext,
  useEcosystemContext,
} from "../../../../../../../../context";

interface IEditSubClassProps extends IEditSubEcosystemProps {
  currSubClass: ISubclassProps;
}

const EditSubClassModal: FC<IEditSubClassProps> = ({
  visible,
  closeModal,
  currEcosystem,
  currSubEcosystem,
  currSubClass,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();
  const { ecosystem: api } = useApiContext();
  const { refetchEcosystems } = useEcosystemContext();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      setIsLoading(true);

      const res = await api.editSubClass(currSubClass.id, {
        ...values,
        sub_ecosystem: currSubEcosystem.id,
        ecosystem: currEcosystem.id,
      });

      if (res.status === 201) {
        setIsLoading(false);
        refetchEcosystems();
        Modal.success({
          title: "Sub-Class edited successfully",
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
      title={<strong>Edit Sub-Class</strong>}
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
          name: currSubClass.name,
        }}
      >
        <Form.Item
          name="name"
          rules={[{ message: "Please input sub-class name!", required: true }]}
        >
          <InputStyled placeholder="Name of Sub-Class" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditSubClassModal;
