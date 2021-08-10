import React, { useContext, useState } from "react";
import { Row } from "antd";
import Heading from "../../../../components/heading/heading";
import ListOrganizationForm from "./_partials/ListOrganizationForm";
import Uploads from "./_partials/Uploads";
import Preview from "./_partials/Preview";
import { MainColStyled } from "../AddCompany/styled";
import { BusinessContext } from "../../context";
import { AdminSectionWrapper } from "../../../Admin/styled";
import { Main } from "../../../AuthLayout/styled";
import { StepsStyled } from "./styled";

const { Step } = StepsStyled;

const ListOrganization = () => {
  const [current, setCurrent] = useState(0);

  const customDot = (dot: any) => dot;

  const { state } = useContext(BusinessContext);

  const prev = () => setCurrent(current - 1);

  const next = () => setCurrent(current + 1);

  const steps = [
    {
      title: "Details",
      content: <ListOrganizationForm next={next} />,
    },
    {
      title: "Upload",
      content: <Uploads prev={prev} next={next} />,
    },
    {
      title: "Finish",
      content: <Preview prev={prev} />,
    },
  ];

  return (
    <AdminSectionWrapper
      className="section-list-organization"
      background="#fff"
    >
      <Main background="#fff">
        <Row style={{ justifyContent: "center", paddingTop: "3rem" }}>
          <MainColStyled>
            <div style={{ marginBottom: "1.5rem" }}>
              <div>
                <Heading className="text-center font-weight-700" as="h3">
                  List your{" "}
                  {state.business_type === "Enterpreneur"
                    ? "Business"
                    : "Organization"}{" "}
                  <br /> ({state.business_type})
                </Heading>

                <StepsStyled
                  // labelPlacement="vertical"
                  current={current}
                  progressDot={customDot}
                >
                  {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                  ))}
                </StepsStyled>
              </div>

              {steps[current].content}
            </div>
          </MainColStyled>
        </Row>
      </Main>
    </AdminSectionWrapper>
  );
};

export default ListOrganization;
