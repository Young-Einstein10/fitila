import React from 'react';
import Heading from '../../../../components/heading/heading';
import { ReactComponent as Enterpreneur } from '../../../../static/svg/enterpreneur.svg';
import { ReactComponent as Ecosystem } from '../../../../static/svg/ecosystem.svg';

import { SectionWrapper } from '../../../Landing/styled';
import Styled from 'styled-components';
import { Button, Col, Row } from 'antd';

const SpanStyled = Styled.span`
  cursor: pointer;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #F1F4F5
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ColStyled = Styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonStyled = Styled(Button)`
  width: 100%;
  margin-top: 3rem
`;

const SpanFooter = Styled.span`
  font-size: 12px;
  font-weight: 400;
`;

const AddCompany = () => {
  return (
    <SectionWrapper>
      <Row className="add_company_container" style={{ justifyContent: 'center', paddingTop: '3rem' }}>
        <Col className="text-center" style={{ maxWidth: '400px' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <div className="text-center" style={{ marginBottom: '2rem' }}>
              <Heading className="text-center" as="h3">
                List your Organization
              </Heading>
              <p>
                Thanks for choosing to list your Business on Enterprise Data Map, Please select a role to get started
              </p>
            </div>

            <Row>
              <ColStyled span={12} className="text-center">
                <SpanStyled className="enterpreneur">
                  <Enterpreneur />
                </SpanStyled>
                <span style={{ marginTop: '15px' }}>I am an Enterpreneur</span>
              </ColStyled>

              <ColStyled span={12} className="text-center">
                <SpanStyled className="ecosystem">
                  <Ecosystem />
                </SpanStyled>
                <span style={{ marginTop: '15px' }}>I am an Ecosystem Enabler</span>
              </ColStyled>
            </Row>
            <ButtonStyled size="large" type="primary">
              Continue
            </ButtonStyled>
          </div>

          <SpanFooter>By Clicking “continue” you agree to our Terms and Conditions an Privacy policy.</SpanFooter>
        </Col>
      </Row>
    </SectionWrapper>
  );
};

export default AddCompany;
