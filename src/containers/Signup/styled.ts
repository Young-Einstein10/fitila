import { Input } from 'antd';
import Styled from 'styled-components';

const InputStyled = Styled(Input)`
  background-color: #F9F9F9;
  border-radius: 6px;
  
&.ant-input, #login_password, &.ant-input-affix-wrapper > input.ant-input {
  
  background-color: #F9F9F9;  }
`;

export { InputStyled };
