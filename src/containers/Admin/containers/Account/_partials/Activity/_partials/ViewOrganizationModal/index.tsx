import { Modal, Button } from "antd";
import React, { FC } from "react";
import { IOrganizationProps } from "../../../../../../../../context/Organization/types";
import { capitalize } from "../../../../../../../../utils/helpers";
import { IEditEcosystemProps } from "../../../../../Dashboard/_partials/Ecosystem/_partials/EditEcosystemModal";

export type IViewProps = Pick<IEditEcosystemProps, "visible" | "closeModal"> & {
  currentOrganization: IOrganizationProps;
  toggleEditOrganizationModal: () => void;
};

const ViewOrganizationModal: FC<IViewProps> = ({
  visible,
  closeModal,
  currentOrganization,
  toggleEditOrganizationModal,
}) => {
  const {
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
    phone,
    num_supported_business,
    is_ecosystem,
    is_startup,
    ecosystem_name,
    sub_ecosystem_name,
    sub_ecosystem_sub_class_name,
    cac_doc,
    linkedIn,
    twitter,
    facebook,
    website,
    date_created,
  } = currentOrganization;

  return (
    <Modal
      title={<strong>Organization Details</strong>}
      visible={visible}
      onCancel={closeModal}
      footer={[
        <Button
          type="primary"
          key="edit"
          onClick={() => toggleEditOrganizationModal()}
        >
          Edit
        </Button>,
      ]}
    >
      <div>
        <p>
          <strong>Company</strong>: {name || "--"}
        </p>

        <p>
          <strong>Business Type</strong>:{" "}
          {is_ecosystem ? "Ecosystem Player" : "Enterpreneur"}
        </p>

        <p>
          <strong>Description</strong>: {description || "--"}
        </p>

        <p>
          <strong>CEO/Founder</strong>: {ceo_name.name || "--"}
        </p>

        <p>
          <strong>Phone</strong> {phone || "--"}
        </p>

        <p>
          <strong>Startup</strong>: {is_startup ? "Yes" : "No"}
        </p>

        <p>
          <strong>Ecosystem</strong>: {ecosystem_name || "--"}
        </p>

        <p>
          <strong>Sub-Ecosystem</strong>: {sub_ecosystem_name || "--"}
        </p>

        <p>
          <strong>Sub-Ecosystem Sub-Class </strong>:{" "}
          {sub_ecosystem_sub_class_name || "--"}
        </p>

        <p>
          <strong>CEO Gender</strong>: {capitalize(ceo_gender) || "--"}
        </p>
        <p>
          <strong>Address</strong>: {address || "--"}
        </p>

        <p>
          <strong>State</strong>: {state || "--"}
        </p>

        <p>
          <strong>Business Level</strong>: {business_level || "--"}
        </p>

        <p>
          <strong>Company Valuation</strong>: {company_valuation || "--"}
        </p>

        <p>
          <strong>Sector</strong>: {sector_name || "--"}
        </p>

        <p>
          <strong>Employees</strong>: {num_of_employees || "--"}
        </p>

        <p>
          <strong>Number of Supported Businesses</strong>:{" "}
          {num_supported_business || "--"}
        </p>

        <p>
          <strong>Funding (₦)</strong>: {funding || "--"}
        </p>

        <p>
          <strong>Business RC Number</strong>: {cac_doc || "--"}
        </p>

        <p>
          <strong>LinkedIn</strong>: {linkedIn || "--"}
        </p>

        <p>
          <strong>Twitter</strong>: {twitter || "--"}
        </p>

        <p>
          <strong>Facebook</strong>: {facebook || "--"}
        </p>

        <p>
          <strong>Website</strong>: {website || "--"}
        </p>

        <p>
          <strong>Date Listed</strong>:{" "}
          {new Date(date_created).toLocaleString() || "--"}
        </p>
      </div>
    </Modal>
  );
};

export default ViewOrganizationModal;
