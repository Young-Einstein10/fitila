import { Layout } from 'antd';
import Styled from 'styled-components';
const { Footer } = Layout;

const FooterStyled = Styled(Footer)`
  height: 64px;
  background: #F2F2F2;
  color: #5F6368;
 
          span.admin-footer__copyright{
              display: inline-block;
              width: 100%;
              color: ${({ theme }) => theme['light-color']};
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
                  color: ${({ theme }) => theme['light-color']};
                  margin-left: 15px;
                  
                  &:hover{
                      color: ${({ theme }) => theme['primary-color']};
                  }
              }
          }
      
`;

export { FooterStyled };
