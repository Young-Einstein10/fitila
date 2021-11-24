import React, { ComponentPropsWithRef } from "react";
import { Input } from "antd";
import { ReactComponent as SearchIconLeft } from "../../static/svg/SearchIconLeft.svg";
import styled from "styled-components";

type InputProps = ComponentPropsWithRef<typeof Input>;

const SearchInput = ({ onChange, ...rest }: InputProps) => {
  return (
    <InputStyled
      onChange={onChange}
      placeholder="Search Companies"
      prefix={<SearchIconLeft />}
      {...rest}
    />
  );
};

const InputStyled = styled(Input)`
  && {
    height: 48px;
    padding: 0 10px;
    width: 300px;
    max-width: 100%;

    /* @media screen and (max-width: 460px) {
      min-width: 100%;
      
    } */
  }
`;

export default SearchInput;
