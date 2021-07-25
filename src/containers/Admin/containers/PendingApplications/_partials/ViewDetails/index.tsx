import React, { FC } from "react";
import { Modal, Button } from "antd";
import { IOrganizationProps } from "../../../../../../context/Organization/types";

interface IViewDetailsProps {
  visible: boolean;
  closeModal: () => void;
  currentListing?: IOrganizationProps;
  handleApproval: (id: number) => Promise<void>;
  handleDecline: (id: number) => Promise<void>;
}

const ViewDetails: FC<IViewDetailsProps> = ({
  visible,
  closeModal,
  currentListing,
  handleApproval,
  handleDecline,
}) => {
  const {
    id,
    name,
    ceo_name,
    state,
    sector_name,
    num_of_employees,
    funding,
    address,
    business_level,
    ceo_gender,
    company_valuation,
    description,
  } = currentListing;

  return (
    <Modal
      title={<strong>View Company Details</strong>}
      visible={visible}
      onCancel={closeModal}
      footer={[
        <Button key="declne" onClick={() => handleDecline(id)}>
          Decline
        </Button>,
        <Button type="primary" key="approve" onClick={() => handleApproval(id)}>
          Approve
        </Button>,
      ]}
    >
      <div>
        <p>
          <strong>Company</strong>: {name || "-"}
        </p>

        <p>
          <strong>Description</strong>: {description || "-"}
        </p>
        <p>
          <strong>CEO/Founder</strong>: {ceo_name.name || "-"}
        </p>

        <p>
          <strong>CEO Gender</strong>: {ceo_gender || "-"}
        </p>
        <p>
          <strong>address</strong>: {address || "-"}
        </p>

        <p>
          <strong>State</strong>: {state || "-"}
        </p>

        <p>
          <strong>Business Level</strong>: {business_level || "-"}
        </p>

        <p>
          <strong>Company Valuation</strong>: {company_valuation || "-"}
        </p>

        <p>
          <strong>Sector</strong>: {sector_name || "-"}
        </p>

        <p>
          <strong>Employees</strong>: {num_of_employees || "-"}
        </p>

        <p>
          <strong>Funding (₦)</strong>: {funding}
        </p>
      </div>
    </Modal>
  );
};

export default ViewDetails;
