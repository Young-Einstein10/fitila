import { Layout, Button } from "antd";
import { Link } from "react-router-dom";
import Styled from "styled-components";
const { Header, Footer } = Layout;

const Div = Styled.div`
    background: #fff
`;

const LayoutStyled = Styled(Layout)`
    & header.ant-layout-header {
        box-shadow: 0px 2px 8px rgba(53,55,81,0.04);
        padding: 0 40px;
        display: flex;
        align-items: center;
        height: 76px;
        
        .ant-row {
          flex: 1;       
        }

        @media screen and (max-width: 768px) {
          padding: 0 1rem;
        }
    }

    & .ant-layout-content {
      
      background: #fff;
      min-height: calc(100vh - 152px);
      margin-top: 4rem;

      @media screen and (min-width: 768px) {
        padding: 0 3.125rem;
      }
    }
`;

const HeaderStyled = Styled(Header)`  
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    background: #fff

    .ant-layout-header {
      
        min-height: 76px;
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
        margin-top: 0;
    }

   
`;

const FooterStyled = Styled(Footer)`

  &.ant-layout-footer {
    min-height: 76px;
    background: #F2F2F2;
    color: #5F6368;
    font-size: 16px;
    padding: 0 40px;
    display: flex;
    align-items: center;
  }

  .ant-row {
    flex: 1;
  }
 
          span.admin-footer__copyright{
            display: inline-block;
            width: 100%;
            color: ${({ theme }) => theme["light-color"]};
            @media only screen and (max-width: 767px){
                text-align: center;
                margin-bottom: 2rem;
                margin-top: 25px;
            }
        }
          div.admin-footer__links{
            text-align: right;
            
            @media only screen and (max-width: 767px){
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            a{
                color: ${({ theme }) => theme["light-color"]};

                &:not(:last-child){
                  margin-right: 15px;                      
                }

                @media only screen and (max-width: 767px){
                  &:not(:last-child), &:last-child {
                      margin: 0.6rem 0
                  }
                }

                &:hover{
                    color: ${({ theme }) => theme["primary-color"]};
                }

            }
        }
      
`;

const BusinessButton = Styled(Button)`
  border: ${({ theme }) => `solid 1px ${theme["primary-color"]}`}
  color: ${({ theme }) => theme["primary-color"]}
  margin-right: 2rem;
  width: 100%;
`;

const ButtonStyled = Styled(Button)`
  background: #F7F9FA
   color: ${({ theme }) => theme["primary-color"]}
  font-weight: 700;
  border: 0;

  &:hover, &:active {
   background: #F7F9FA;
   color: ${({ theme }) => theme["primary-color"]}
  font-weight: 700;
  border: 0;
  }
`;

const LinkStyled = Styled(Link)`
  background: #F7F9FA; 
   color: ${({ theme }) => theme["primary-color"]}
  
  &:first-child {
    margin-bottom: 0.625rem
  }
  
  &:hover {
    background:  #F7F9FA;
  }

  span {
    display: flex;
    align-items: center;
     color: ${({ theme }) => theme["primary-color"]}
    font-weight: bold;
    font-size: 1rem
  }
`;

export {
  BusinessButton,
  ButtonStyled,
  LinkStyled,
  Div,
  LayoutStyled,
  HeaderStyled,
  FooterStyled,
};
