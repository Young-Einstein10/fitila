import { Collapse } from "antd";
import Styled from "styled-components";

const CollapseStyled = Styled(Collapse)`
  & > .styled-collapse {
    & .ant-collapse-item {

      .ant-collapse-header {
        padding: 1.3rem 0; 

         p {
          margin-bottom: 0;
        }
      }
    }

    & .ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header {
      display: flex;
      align-items: center;
      padding: 1.5rem 1rem 1rem 0; 
    }

    & .ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
      top: 0;
    }

  }


    & > .ant-collapse-content > .ant-collapse-content-box {
      padding-left: 0;
      padding-right: 2rem;
    }
`;

export { CollapseStyled };
