import { Layout } from "antd";
import Styled from "styled-components";
const { Header, Footer } = Layout;


const LayoutStyled = Styled(Layout)`
    & header.ant-layout-header {
        box-shadow: 0px 2px 8px rgba(53,55,81,0.04);
        padding: 0 40px;
    }
`

const HeaderStyled = Styled(Header)`    

    .ant-layout-header {
        min-height: 64px;
        /* box-shadow: 0px 2px 8px rgba(53, 55, 81, 0.04) !important; */
        padding: 0.2rem 3rem;

    }

    .navItem-left,
    .navItem-right {
        display: flex;
        align-items: center;
    }   
    
    .ant-breadcrumb {
        margin-left: 5rem;
        color: #000000;
        font-weight: 700;
    }

    .account-btn {
        margin-left: 2rem
    }
`;

const FooterStyled = Styled(Footer)`

  &.ant-layout-footer {
    height: 64px;
    background: #F2F2F2;
    color: #5F6368;

  }
 
          span.admin-footer__copyright{
              display: inline-block;
              width: 100%;
              color: ${({ theme }) => theme["light-color"]};
              @media only screen and (max-width: 767px){
                  text-align: center;
                  margin-bottom: 10px;
              }
          }
          div.admin-footer__links{
              text-align: right;
              @media only screen and (max-width: 767px){
                  text-align: center;
              }
              a{
                  color: ${({ theme }) => theme["light-color"]};
                  margin-left: 15px;
                  
                  &:hover{
                      color: ${({ theme }) => theme["primary-color"]};
                  }
              }
          }
      
`;

export { LayoutStyled, HeaderStyled, FooterStyled };
