import React, { FC, useState } from "react";
import { Modal, Form, Button } from "antd";
import { InputStyled } from "../../../../../Styles";
import { useApiContext } from "../../../../../../context";

interface ICreateAdminProps {
  visible: boolean;
  closeModal: () => void;
  refetchAdminUsers: () => void;
}

const CreateAdminModal: FC<ICreateAdminProps> = ({
  visible,
  closeModal,
  refetchAdminUsers,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [form] = Form.useForm();

  const { auth: api } = useApiContext();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      setIsLoading(true);

      const res = await api.createAdmin({ ...values, role: "Admin" });

      if (res.status === 201) {
        refetchAdminUsers();

        Modal.success({
          title: "Admin has been added successfully",
          onOk: () => closeModal(),
        });
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title={<strong>Create Administrators</strong>}
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
          Create
        </Button>,
      ]}
      destroyOnClose
    >
      <Form name="signup" form={form}>
        <Form.Item
          name="first_name"
          rules={[{ message: "Please input your firstname!", required: true }]}
        >
          <InputStyled placeholder="First Name" />
        </Form.Item>

        <Form.Item
          name="last_name"
          rules={[{ message: "Please input your lastname!", required: true }]}
        >
          <InputStyled placeholder="Last Name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not a valid E-mail!",
            },
            { message: "Please input your Email!", required: true },
          ]}
        >
          <InputStyled placeholder="Email Address" />
        </Form.Item>

        {/* <Form.Item
          name="phone"
          rules={[
            {
              message: "Please input phone number !",
              required: true,
            },
          ]}
        >
          <InputStyled placeholder="Phone Number" />
        </Form.Item> */}

        {/* <Form.Item
          name="role"
          rules={[{ message: "Please Select a role", required: true }]}
        >
          <Select placeholder="Choose Your Role" allowClear>
            <Option value="Admin">Admin</Option>
            <Option value="User">User Player</Option>
            <Option value="Others">Others</Option>
          </Select>
        </Form.Item> */}

        <Form.Item
          name="password"
          rules={[{ message: "Please enter your password", required: true }]}
        >
          <InputStyled.Password placeholder="Password" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateAdminModal;
