import { Collapse } from "antd";
import Styled from "styled-components";

const CollapseStyled = Styled(Collapse)`
  .styled-collapse {
    .ant-collapse-item {

      &.ant-collapse-header {
        padding: 1.3rem 0; 

        & p {
          margin-bottom: 0l
        }
      }
    }

  }

`;

export { CollapseStyled };
