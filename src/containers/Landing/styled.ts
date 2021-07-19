import { Form } from "antd";
import styled from "styled-components";

export const FormStyled = styled(Form)`
  && {
    padding-top: 5rem;
  }

  .header-main {
    font-size: 3rem;
    font-weight: bold;
    margin-top: 5rem;
  }

  .extra-text {
    font-size: 1.5rem;
    color: #696969;
    text-align: center;
  }

  .search__box {
    margin-top: 2.5rem;
    display: flex;
    justify-content: center;
    padding: 0 2rem;

    .ant-form-item-control-input-content {
      display: flex;
      justify-content: center;
    }
  }
`;
