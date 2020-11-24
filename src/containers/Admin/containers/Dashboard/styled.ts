import { Card, Button } from "antd";
import Styled from "styled-components";

const CardSegmentStyled = Styled(Card)`

  .ant-card-body {
    background: #F8F8F8;
    display: flex;
    align-items: center;

    div {
      margin-left: 20px;
    }

    span {
      color: #5C6066;
    }
  }
`;

const ViewProfileBtnStyled = Styled(Button)`
  color: #FF6D00
  border: 1px solid #FF6D00
`;

const TableHeaderButtonStyled = Styled(Button)`
  background: #F7F9FA;
  color: #1D429C;
  font-weight: 700;
  border: 0;

  &:hover {
    background: #F7F9FA;
    color: #1D429C;
    border-color: #F7F9FA;
  }

  svg {
    margin-left: 25px
  }
`;

export { CardSegmentStyled, ViewProfileBtnStyled, TableHeaderButtonStyled };
