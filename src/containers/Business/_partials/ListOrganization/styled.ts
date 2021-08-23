import { Form, Steps, Divider } from "antd";
import { Cards } from "../../../../components/cards/frame/cards-frame";
import styled from "styled-components";

const StepsStyled = styled(Steps)`
  &.ant-steps-horizontal {
    margin: 2rem 0;
  }

  /* &.ant-steps-item-icon {
    width: 20px;
    height: 20px;
  } */
`;

const StyledDivider = styled(Divider)`
  margin: 2rem 0;
`;

const StyledCard = styled(Cards)`
  margin-bottom: 1.5rem;

  .ant-card-body {
    padding: 1.5rem;
  }
`;

const FormStyled = styled(Form)`
  .ant-form-item {
    margin-bottom: 2rem;
  }
`;

export { StepsStyled, StyledCard, FormStyled, StyledDivider };
