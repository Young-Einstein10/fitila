import { Modal, Button } from "antd";
import React, { FC } from "react";
import { IOrganizationProps } from "../../../../../../../../context/Organization/types";
import {
  capitalize,
  numberWithCommas,
} from "../../../../../../../../utils/helpers";
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
    funding_disbursed_for_support,
    address,
    business_level,
    ceo_gender,
    company_valuation,
    description,
    phone,
    num_supported_business,
    is_ecosystem,
    is_entrepreneur,
    no_of_jobs,
    ecosystem_name,
    sub_ecosystem_name,
    sub_ecosystem_sub_class_name,
    reason_for_decline,
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
          <strong>Business Role</strong>:{" "}
          {(is_ecosystem && "Ecosystem Player") ||
            (is_entrepreneur && "Enterpreneur") ||
            "--"}
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

        {currentOrganization.is_ecosystem && (
          <>
            {" "}
            <p>
              <strong>Ecosystem</strong>: {ecosystem_name || "--"}
            </p>
            <p>
              <strong>Sub-Ecosystem</strong>: {sub_ecosystem_name || "--"}
            </p>
            <p>
              <strong>Sub-Ecosystem Sub-Class </strong>:{" "}
              {sub_ecosystem_sub_class_name || "--"}
            </p>{" "}
          </>
        )}

        <p>
          <strong>CEO Gender</strong>: {capitalize(ceo_gender) || "--"}
        </p>
        <p>
          <strong>Address</strong>: {address || "--"}
        </p>

        <p>
          <strong>State</strong>: {state || "--"}
        </p>

        {currentOrganization.is_entrepreneur && (
          <p>
            <strong>Business Level</strong>: {business_level || "--"}
          </p>
        )}

        <p>
          <strong>Company Valuation</strong>:{" "}
          {numberWithCommas(company_valuation) || "--"}
        </p>

        {currentOrganization.is_entrepreneur && (
          <p>
            <strong>Number of Employees</strong>: {no_of_jobs || "--"}
          </p>
        )}

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
          <strong>Funding (₦)</strong>: {numberWithCommas(funding) || "--"}
        </p>

        {currentOrganization.is_ecosystem && (
          <p>
            <strong>Funding Disbursed for Support Businesses</strong>:{" "}
            {funding_disbursed_for_support || "--"}
          </p>
        )}

        <p>
          <strong>Business RC Number</strong>: {cac_doc || "--"}
        </p>
        <p>
          <strong>LinkedIn</strong>:{" "}
          {(linkedIn && (
            <a href={linkedIn} target="_blank" rel="noreferrer noopener">
              {linkedIn}
            </a>
          )) ||
            "--"}
        </p>

        <p>
          <strong>Twitter</strong>:{" "}
          {(twitter && (
            <a href={twitter} target="_blank" rel="noreferrer noopener">
              {twitter}
            </a>
          )) ||
            "--"}
        </p>

        <p>
          <strong>Facebook</strong>:{" "}
          {(facebook && (
            <a href={facebook} target="_blank" rel="noreferrer noopener">
              {facebook}
            </a>
          )) ||
            "--"}
        </p>

        <p>
          <strong>Website</strong>:{" "}
          {(website && (
            <a href={website} target="_blank" rel="noreferrer noopener">
              {website}
            </a>
          )) ||
            "--"}
        </p>
        <p>
          <strong>Date Listed</strong>:{" "}
          {new Date(date_created).toLocaleString() || "--"}
        </p>

        {reason_for_decline && (
          <p>
            <strong>Reason for Decline:</strong>
            {reason_for_decline}
          </p>
        )}
      </div>
    </Modal>
  );
};

export default ViewOrganizationModal;
