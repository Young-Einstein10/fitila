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

  &.active {
    background: #FFF4EC
 
      svg {
     
        path:nth-child(2) {            
          fill: ${({ theme }) => theme["primary-icon-color"]};
        }

        path:nth-child(3) {            
          fill: ${({ theme }) => theme["secondary-icon-color"]};;
        }

        path:nth-child(4) {            
          fill: #000;
        }
      }
  }
  
  &:hover, &:active {
    background: #FFF4EC
 
      svg {
     
        path:nth-child(2) {            
          fill: ${({ theme }) => theme["primary-icon-color"]};
        }

        path:nth-child(3) {            
          fill: ${({ theme }) => theme["secondary-icon-color"]};
        }

        path:nth-child(4) {            
          fill: #000;
        }
      }

    
  }
`;

const ColStyled = Styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainColStyled = Styled(Col)`
  max-width: 400px;

  @media screen and (max-width: 576px) {
    width: 100%
  }
`;

const SpanFooter = Styled.span`
  font-size: 12px;
  font-weight: 400;
  text-align: center;
`;

export { SpanStyled, ColStyled, MainColStyled, SpanFooter };
