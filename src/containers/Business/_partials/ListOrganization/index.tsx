import React, { useContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Row } from "antd";
import Heading from "../../../../components/heading/heading";
import ListOrganizationForm from "./_partials/ListOrganizationForm";
import Uploads from "./_partials/Uploads";
import Preview from "./_partials/Preview";
import { MainColStyled } from "../AddCompany/styled";
import { BusinessContext } from "../../context";
import { AdminSectionWrapper } from "../../../Admin/styled";
import { Main } from "../../../AuthLayout/styled";
import { StepsStyled, StyledCard } from "./styled";
import useGooglePlacesHook from "../../../../utils/useGooglePlacesHook";
import { WithBusinessProvider } from "../..";

const { Step } = StepsStyled;

const ListOrganization = () => {
  const [current, setCurrent] = useState(0);

  const customDot = (dot: any) => dot;

  const { state, setState } = useContext(BusinessContext);

  const { state: businessData } = useLocation<any>();

  const history = useHistory();

  useEffect(() => {
    if (businessData) {
      setState(businessData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!businessData) {
      history.push("/business");
    }
  }, [history, businessData]);

  const [loaded, error] = useGooglePlacesHook();

  useEffect(() => {
    // Initialize Google Places API
    if (loaded) {
      console.log("Google Places API has been initialized");
    }

    if (error) {
      console.log("An error occured initializing Google Places API");
    }
  }, [loaded, error]);

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
    <AdminSectionWrapper className="section-list-organization">
      <Main>
        <Row style={{ justifyContent: "center", paddingTop: "3rem" }}>
          <MainColStyled>
            <StyledCard headless>
              <div>
                <Heading
                  as="h1"
                  fontWeight="bold"
                  fontSize="33px"
                  margin="0 0 2rem 0"
                  className="text-center"
                >
                  List your{" "}
                  {state.business_type === "Enterpreneur"
                    ? "Business"
                    : "Organization"}{" "}
                  <br /> ({state.business_type})
                </Heading>

                <StepsStyled current={current} progressDot={customDot}>
                  {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                  ))}
                </StepsStyled>
              </div>

              {steps[current].content}

              {/* <PlacesAutocomplete /> */}
            </StyledCard>
          </MainColStyled>
        </Row>
      </Main>
    </AdminSectionWrapper>
  );
};

export default WithBusinessProvider(ListOrganization);
