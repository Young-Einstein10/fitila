import { Row } from "antd";
import Style from "styled-components";

const RowStyled = Style(Row)`


  .profile-summary-data {
    width: 100%;

    div {
      display: flex;
      align-items: center;

      span {
        width: 50%
      }
    }
  }
`;

export { RowStyled };
