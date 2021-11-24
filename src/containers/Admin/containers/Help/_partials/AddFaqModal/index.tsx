import React, { FC, useState } from "react";
import { Modal, Button, Form } from "antd";
import { InputStyled } from "../../../../../Styles";
import { useApiContext, useFAQContext } from "../../../../../../context";

type IAddFaqModalProps = {
  visible: boolean;
  closeModal: () => void;
};

const AddFaqModal: FC<IAddFaqModalProps> = ({ visible, closeModal }) => {
  const [isLoading, setIsLoading] = useState(false);

  const api = useApiContext();
  const { refetchFAQs } = useFAQContext();
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      setIsLoading(true);

      const res = await api.faq.addFaq({ ...values, is_active: true });

      if (res.status === 201) {
        Modal.success({
          title: "Question added successfully.",
          onOk: async () => {
            await refetchFAQs();
            closeModal();
          },
        });
      }

      setIsLoading(false);
    } catch (error) {
      // throw new Error(error);

      return error;
    }
  };

  return (
    <Modal
      title={<strong>Add a FAQ</strong>}
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
          Save
        </Button>,
      ]}
      destroyOnClose
    >
      <Form form={form}>
        <Form.Item
          name="question"
          rules={[{ message: "please enter a question!", required: true }]}
        >
          <InputStyled placeholder="Question" />
        </Form.Item>

        <Form.Item
          name="answer"
          rules={[{ message: "please enter answer!", required: true }]}
        >
          <InputStyled.TextArea
            style={{ height: "200px" }}
            placeholder="Enter Answer"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddFaqModal;
