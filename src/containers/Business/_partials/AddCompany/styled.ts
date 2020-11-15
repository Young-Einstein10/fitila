import Styled from "styled-components";
import { Col } from "antd";

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

const MainColStyled = Styled(Col)`
  max-width: 400px;
`;

const SpanFooter = Styled.span`
  font-size: 12px;
  font-weight: 400;
  text-align: center;
`;

export { SpanStyled, ColStyled, MainColStyled, SpanFooter };
