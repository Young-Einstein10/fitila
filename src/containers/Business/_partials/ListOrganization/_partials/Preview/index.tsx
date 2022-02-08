import React, { useContext, useState, FC } from "react";
import { serialize } from "object-to-formdata";
import { ButtonStyled } from "../../../../../Styles";
import {
  arrToString,
  capitalize,
  convertToFormData,
  numberWithCommas,
} from "../../../../../../utils/helpers";
import { useApiContext, useSectorContext } from "../../../../../../context";
import { BusinessContext } from "../../../../context";
import { useHistory } from "react-router-dom";

interface IPreviewProps {
  prev: () => void;
}

const Preview: FC<IPreviewProps> = ({ prev }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { organization: api } = useApiContext();
  const { data: sectors } = useSectorContext();

  const history = useHistory();

  const { state } = useContext(BusinessContext);

  const {
    state: organization_state,
    selectedEcosystemNames,
    selectedSubEcosystemNames,
    selectedSubClassNames,
    // sub_ecosystem_sub_class_name,
    // sub_segment: subSegmentId,
    business_type,
    name,
    sector,
    description,
    ceo_name,
    ceo_gender,
    ceo_image,
    company_logo,
    address,
    business_level,
    num_supported_business,
    website,
    num_of_employees,
    funding_currency,
    funding_currency_value,
    company_valuation,
    currency,
    email,
    phone,
    facebook,
    instagram,
    linkedin,
    twitter,
    cac_doc,
  } = state;

  const is_startup =
    business_level && business_level.toLowerCase() === "startup";

  const handleSubmit = () => {
    setIsLoading(true);

    const selectedSector = sectors.find(
      sector => sector.name.toLowerCase() === state.sector
    );

    const { ceo_image, company_logo, ...rest } = state;

    const data = { ...state, sector: selectedSector.id };
    console.log(data);

    const formData = convertToFormData(data);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    api
      .addBusiness(formData)
      .then(res => {
        setIsLoading(false);
        if (res && res.status === 201) {
          history.push("/business/success");
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const ceo_name_label =
    state.business_type === "Entrepreneur"
      ? "CEO/Founder's Name"
      : "CEO/DG/Head/Founder's Name";

  return (
    <div>
      <div className="preview-info">
        <p>
          <strong>Business Type:</strong>
          <br />
          {business_type}
        </p>

        <p>
          <strong>Organization Name:</strong>
          <br />
          {name}
        </p>

        <p>
          <strong>{ceo_name_label}:</strong>
          <br />
          {ceo_name}
        </p>

        <p>
          <strong>Gender:</strong>
          <br />
          {capitalize(ceo_gender)}
        </p>

        <p>
          <strong>Business Address:</strong>
          <br />
          {address}
        </p>

        <p>
          <strong>State:</strong>
          <br />
          {organization_state}
        </p>

        {business_type === "Ecosystem Enabler" && (
          <p>
            <strong>Ecosystem Segment:</strong>
            <br />
            {/* {selectedEcosystem.length > 0 && selectedEcosystem[0].name} */}
            {arrToString(selectedEcosystemNames)}
          </p>
        )}

        {business_type === "Ecosystem Enabler" && (
          <p>
            <strong>Sub-Segment of Ecosystem:</strong>
            <br />
            {/* {selectedSubEcosystem.length && selectedSubEcosystem[0].name} */}
            {arrToString(selectedSubEcosystemNames)}
          </p>
        )}

        {business_type === "Ecosystem Enabler" && (
          <p>
            <strong>Sub-Segment SubClass:</strong>
            <br />
            {/* {sub_ecosystem_sub_class_name || "--"} */}
            {arrToString(selectedSubClassNames)}
          </p>
        )}

        {
          <p>
            <strong>Sector:</strong>
            <br />
            {capitalize(sector)}
          </p>
        }

        {business_type === "Entrepreneur" && (
          <p>
            <strong>Business Level:</strong>
            <br />
            {business_level}
          </p>
        )}

        {business_type === "Entrepreneur" && is_startup && company_valuation && (
          <p>
            <strong>Company Valuation:</strong>
            <br />
            {currency}
            {numberWithCommas(company_valuation)}
          </p>
        )}

        {business_type === "Ecosystem Enabler" && (
          <p>
            <strong>
              Number of businesses supported over the last 5 years:
            </strong>
            <br />
            {num_supported_business}
          </p>
        )}

        {funding_currency_value && (
          <p>
            <strong>Funding:</strong>
            <br />
            {`${funding_currency}${numberWithCommas(funding_currency_value)}`}
          </p>
        )}

        {website && (
          <p>
            <strong>Website Address:</strong>
            <br />
            <a href={website} target="_blank" rel="noreferrer noopener">
              {website}
            </a>
          </p>
        )}
        <p>
          <strong>Email Address:</strong>
          <br />
          {email}
        </p>

        <p>
          <strong>Phone Number:</strong>
          <br />
          {phone}
        </p>

        {facebook && (
          <p>
            <strong>Facebook Url:</strong>
            <br />
            <a href={facebook} target="_blank" rel="noreferrer noopener">
              {facebook}
            </a>
          </p>
        )}

        {linkedin && (
          <p>
            <strong>LinkedIn Url:</strong>
            <br />
            <a href={linkedin} target="_blank" rel="noreferrer noopener">
              {linkedin}
            </a>
          </p>
        )}

        {instagram && (
          <p>
            <strong>Instagram Url:</strong>
            <br />
            <a href={instagram} target="_blank" rel="noreferrer noopener">
              {instagram}
            </a>
          </p>
        )}

        {twitter && (
          <p>
            <strong>Twitter Url:</strong>
            <br />
            <a href={twitter} target="_blank" rel="noreferrer noopener">
              {twitter}
            </a>
          </p>
        )}

        {/* Add Image Upload Previews Here */}
        {company_logo && (
          <p>
            <strong>Company Logo:</strong>
            <br />
            {company_logo.name}
          </p>
        )}

        {ceo_image && (
          <p>
            <strong>CEO/Founder Image:</strong>
            <br />
            {ceo_image.name}
          </p>
        )}

        <p>
          <strong>Business RC Number:</strong>
          <br />
          {cac_doc}
        </p>

        <p>
          <strong>Number of Employees:</strong>
          <br />
          {num_of_employees}
        </p>

        <p>
          <strong>Description:</strong>
          <br />
          {description || "--"}
        </p>
      </div>

      <ButtonStyled
        size="large"
        htmlType="submit"
        type="primary"
        loading={isLoading}
        onClick={() => handleSubmit()}
      >
        Submit
      </ButtonStyled>
    </div>
  );
};

export default Preview;
