import React, { FC, useState } from "react";
import { Modal, Button, Form } from "antd";
import { InputStyled } from "../../../../../Styles";
import { useApiContext } from "../../../../../../context";
import { IOrganizationProps } from "../../../../../../context/Organization/types";

interface IComponentProps {
  visible: boolean;
  closeModal: () => void;
  currentListing: IOrganizationProps;
  refetchPendingApplications: () => void;
}

const ReasonModal: FC<IComponentProps> = ({
  visible,
  closeModal,
  currentListing,
  refetchPendingApplications,
}) => {
  const [isDeclineLoading, setIsDeclineLoading] = useState(false);

  const { organization: api } = useApiContext();

  const [form] = Form.useForm();

  const { id } = currentListing;

  const handleDecline = async () => {
    setIsDeclineLoading(true);

    try {
      const values = await form.validateFields();
      console.log(values);
      //   const res = await api.declineOrganization(id, values.reason);

      //   if (res.status === 200) {
      //     Modal.success({
      //       title: "Organization has been declined.",
      //   onOk: () => closeModal()
      //     });
      //     refetchPendingApplications();
      //   }

      setIsDeclineLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsDeclineLoading(false);
    }
  };

  return (
    <Modal
      title={<strong>Reason for Declining Organization</strong>}
      visible={visible}
      onCancel={closeModal}
      footer={[
        <Button key="cancel" onClick={closeModal}>
          Cancel
        </Button>,
        <Button
          key="decline"
          type="primary"
          loading={isDeclineLoading}
          onClick={() => handleDecline()}
        >
          Decline
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="reason"
          label="Reason"
          rules={[
            {
              message: "please enter a reason!",
              required: true,
            },
          ]}
        >
          <InputStyled.TextArea
            placeholder="Enter reason for declining organization"
            style={{ height: "150px" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReasonModal;
