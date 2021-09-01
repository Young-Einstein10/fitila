import { Input, InputNumber, Button, Select } from "antd";
import styled from "styled-components";

const InputStyled = styled(Input)`
  background-color: #f9f9f9;
  border-radius: 6px;

  &.ant-input::placeholder,
  &.ant-select-selection-placeholder {
    color: ${({ theme }) => theme["extra-light-color"]};
  }

  & span.ant-select-selection-placeholder {
    color: ${({ theme }) => theme["extra-light-color"]};
  }

  &.ant-input,
  #login_password,
  &.ant-input-affix-wrapper > input.ant-input {
    background-color: #f9f9f9;
  }
`;

const InputNumberStyled = styled(InputNumber)`
  background-color: #f9f9f9;
  border-radius: 6px;
  width: 100% !important;

  .ant-input-number-handler-wrap {
    display: none;
  }

  &.ant-input-number-lg {
    width: 100%;
    height: 56px;
  }

  &.ant-input-number::placeholder,
  &.ant-select-selection-placeholder {
    color: ${({ theme }) => theme["extra-light-color"]};
  }

  & span.ant-select-selection-placeholder {
    color: ${({ theme }) => theme["extra-light-color"]};
  }

  &.ant-input-number,
  #login_password,
  &.ant-input-affix-wrapper > input.ant-input-number {
    background-color: #f9f9f9;
  }
`;

const ButtonStyled = styled(Button)`
  width: 100%;
  margin-top: 1.5rem;
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  /* padding-top: 60px; */
  .text-center {
    text-align: center;
  }

  button {
    &.ant-btn-lg {
      font-size: 16px;
      font-weight: 500;
      border-radius: 4px;
      height: ${({ theme }) => theme["btn-height-large"]};
    }
  }

  &.ant-input::placeholder {
    color: ${({ theme }) => theme["extra-light-color"]};
  }

  .preview-section {
    .preview-info {
      p {
        color: ${({ theme }) => theme["extra-light-color"]};
      }

      strong {
        color: ${({ theme }) => theme["dark-color"]};
      }
    }
  }
`;

const AuthWrapper = styled.div`
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
    padding-top: 3rem;
    padding-bottom: 8rem;

    form{
      width: 420px;

      h1{
        /* font-size: 48px; */
        font-weight: bold;
        margin: 2rem 0;

        @media only screen and (max-width: 767px){
          margin-bottom: 28px;
        }
        input::placeholder{
          color: ${({ theme }) => theme["extra-light-color"]};
        }
      }

      

      .auth-form-action{
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;

        @media only screen and (max-width: 379px){
          flex-flow: column;
          .forgot-pass-link{
            margin-top: 15px;
          }
        }
      }

      .btn-signin-wrapper {
        margin-top: 25px;
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
        padding: 10px;

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

const SelectStyled = styled(Select)<{ width?: string }>`
  width: ${({ width }) => (width ? `${width} !important` : "100% !important")};
  font-size: 16px;
  border-color: ${({ theme }) => theme["secondary-color"]};

  &.ant-select:not(.ant-select-disabled):hover .ant-select-selector {
    border-color: ${({ theme }) => theme["secondary-color"]};
  }

  &.ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    border-color: ${({ theme }) => theme["secondary-color"]};
    border-right-width: 1px !important;
    outline: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &.ant-select:focus-visible {
    border-color: ${({ theme }) => theme["secondary-color"]};
  }

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }

  & span.ant-select-arrow {
    top: 43%;
    width: 21px;
    height: 21px;
    display: flex;
    align-items: center;
  }
`;

const SpinnerStyled = styled.div`
  background: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

const ActionButtonStyled = styled(Button)`
  padding: 4px 10px;
`;

export {
  InputStyled,
  InputNumberStyled,
  ButtonStyled,
  SectionWrapper,
  AuthWrapper,
  SelectStyled,
  ActionButtonStyled,
  SpinnerStyled,
};
