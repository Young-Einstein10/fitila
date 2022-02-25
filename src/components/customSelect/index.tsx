import React, { ReactNode } from "react";
import { Select, SelectProps } from "antd";
import styled from "styled-components";

type CustomSelectProps = SelectProps<any> & {
  prefixIcon?: ReactNode;
};

const CustomSelect = ({
  prefixIcon,
  children,
  placeholder,
  ...rest
}: CustomSelectProps) => {
  return (
    <SelectWrapper>
      {prefixIcon && <div className="prefix-icon-wrapper">{prefixIcon}</div>}
      <Select placeholder={placeholder} {...rest}>
        {children}
      </Select>
    </SelectWrapper>
  );
};

export default CustomSelect;

const SelectWrapper = styled.div`
  position: relative;

  .prefix-icon-wrapper {
    position: absolute;
    z-index: 1;
    width: 3rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  && .ant-select .ant-select-selector {
    padding-left: calc(3rem - 8px);
  }
`;
