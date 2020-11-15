import { Card } from "antd";
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

export { CardSegmentStyled };
