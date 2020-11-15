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

export { InputStyled, ButtonStyled, SectionWrapper };
