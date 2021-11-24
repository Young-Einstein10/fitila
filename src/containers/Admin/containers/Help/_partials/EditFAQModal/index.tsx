import React, { FC, useState } from "react";
import { Modal, Button, Form } from "antd";
import { InputStyled } from "../../../../../Styles";
import { useApiContext, useFAQContext } from "../../../../../../context";
import { IFAQProps } from "../../../../../../context/FAQs";

type IEditFAQModalProps = {
  visible: boolean;
  closeModal: () => void;
  currentFAQ: IFAQProps;
};

const EditFAQModal: FC<IEditFAQModalProps> = ({
  visible,
  closeModal,
  currentFAQ,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const api = useApiContext();
  const { refetchFAQs } = useFAQContext();
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      setIsLoading(true);

      const res = await api.faq.editFaq(currentFAQ.id, {
        ...values,
        is_active: true,
      });

      if (res.status === 202) {
        Modal.success({
          title: "Question edited successfully",
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
      title={<strong>Edit FAQ</strong>}
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
      <Form
        form={form}
        initialValues={{
          ...currentFAQ,
        }}
      >
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

export default EditFAQModal;
