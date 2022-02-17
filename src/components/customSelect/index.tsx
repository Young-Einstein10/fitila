import React, { ReactNode } from "react";
import { Select, SelectProps } from "antd";
import styled from "styled-components";

type CustomSelectProps = SelectProps<any> & {
  prefixIcon?: ReactNode;
};

const CustomSelect = ({ prefixIcon, children, ...rest }: CustomSelectProps) => {
  return (
    <SelectWrapper>
      {prefixIcon && <div className="prefix-icon-wrapper">{prefixIcon}</div>}
      <Select {...rest}>{children}</Select>
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

  /* &.ant-select:not(.ant-select-disabled):hover .ant-select-selector {
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
  } */
`;
