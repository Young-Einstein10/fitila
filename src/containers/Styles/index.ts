import { Input, Button } from "antd";
import Styled from "styled-components";

const InputStyled = Styled(Input)`
  background-color: #F9F9F9;
  border-radius: 6px;

  &.ant-input::placeholder,
  &.ant-select-selection-placeholder {
    color: ${({ theme }) => theme["extra-light-color"]};
  }

  & span.ant-select-selection-placeholder {
    color: ${({ theme }) => theme["extra-light-color"]};
  }
  
  &.ant-input, #login_password, &.ant-input-affix-wrapper > input.ant-input {
    
    background-color: #F9F9F9;  
  }
`;

const ButtonStyled = Styled(Button)`
  width: 100%
  margin-top: 1.5rem
`;

const SectionWrapper = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%
  /* padding-top: 60px; */

  .text-center {
    text-align: center;
  }

  button {
    &.ant-btn-lg{
      font-size: 16px;
      font-weight: 500;
      border-radius: 4px;
      height: ${({ theme }) => theme["btn-height-large"]};
    }
  }

  &.ant-input::placeholder{
    color: ${({ theme }) => theme["extra-light-color"]};
  }

  .preview-section {

    .preview-info {

      p {
        color: ${({ theme }) => theme["extra-light-color"]}
      }

      strong {
        color: ${({ theme }) => theme["dark-color"]};
      }      
    }
  }
`;

const AuthWrapper = Styled.div`
  height: 100%;
  /* height: calc(100vh - (64px + 64px)); */
  padding: 40px;
  @media only screen and (max-width: 1599px){
    padding: 25px;
  }
  
  @media only screen and (max-width: 767px){
    text-align: center;
  }
  .text-center {
    text-align: center;
  }
  .auth-notice{
    text-align: center;
    font-weight: 500;
    color: ${({ theme }) => theme["dark-color"]};
    @media only screen and (max-width: 767px){
      text-align: center;
      margin-top: 15px;
    }
  }
  button{
    &.btn-signin{
      width: 100%;
    }
    &.btn-create{
      border-radius: 8px;
      min-width: 205px;
    }
    &.btn-reset{
      border-radius: 8px;
      min-width: 260px;
    }
    &.ant-btn-lg{
      font-size: 16px;
      font-weight: 500;
      border-radius: 4px;
      height: ${({ theme }) => theme["btn-height-large"]};
    }
  }
  .auth-contents{
    display: flex;
    align-items: center;
    justify-content: center;
    form{
      width: 420px;
      h1{
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 45px;
        @media only screen and (max-width: 767px){
          margin-bottom: 28px;
        }
        input::placeholder{
          color: ${({ theme }) => theme["extra-light-color"]};
        }
      }
      .auth-form-action{
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        @media only screen and (max-width: 379px){
          flex-flow: column;
          .forgot-pass-link{
            margin-top: 15px;
          }
        }
      }
    }
    #forgotPass{
      .forgot-text{
        margin-bottom: 25px;
      }
      .return-text{
        margin-top: 35px;
      }
    }
    .form-divider{
      font-size: 13px;
      color: ${({ theme }) => theme["gray-solid"]};
      text-align: center;
      position: relative;
      margin-bottom: 25px;
      &:before{
        content: '';
        position: absolute;
        width: 100%;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
        height: 1px;
        background: ${({ theme }) => theme["border-color-light"]};
      }
      span{
        background: #fff;
        padding: 0 15px;
        display: inline-block;
        position: relative;
        z-index: 2;
      }
    }
    .social-login{
      display: flex;
      align-items: center;
      margin: -6px;
      justify-content: center;
      list-style: none;
      margin: 0;
      padding: 0;
      @media only screen and (max-width: 767px){
        justify-content: center;
      }
      &.signin-social{
        li{
          a{
            box-shadow: 0 5px 15px ${({ theme }) => theme["light-color"]}10;
            background-color: #fff;
          }
        }
      }
      li{
        padding:6px;
        a{
          display: flex;
          align-items: center;
          justify-content: center;
          /* border-radius: 6px; */
          /* height: 48px; */
          /* padding: 0 15px; */
          /* border: 1px solid ${({ theme }) => theme["border-color-light"]}; */
          /* background: ${({ theme }) => theme["bg-color-light"]}; */
          color: ${({ theme }) => theme["text-color"]};
          font-weight: 500;
          @media only screen and (max-width: 379px){
            /* height: 44px;
            padding: 0 12px; */
          }
          span:not(.anticon){
            display: inline-block;
            margin-left: 5px;
          }
          svg,
          i{
            width: 20px;
            height: 20px;
          }
          &.google-signup,
          &.google-signin{
            display: flex;
            align-items: center;
            padding: 0 30px;
            @media only screen and (max-width: 379px){
              padding: 0 5px;
            }
            img{
              margin-right: 8px;
              @media only screen and (max-width: 379px){
                margin-right: 4px;
              }
            }
          }
          &.facebook-sign{
            color: #475993;
          }
          &.twitter-sign{
            color: #03A9F4;
          }
        }
      }
    }
  }
`;

export { InputStyled, ButtonStyled, SectionWrapper, AuthWrapper };
