import React, { ComponentProps } from "react";
import styled from "styled-components";

const ErrorComponent = (
  props?: ComponentProps<typeof ErrorComponentStyled>
) => {
  return (
    <ErrorComponentStyled {...props}>{props.children}</ErrorComponentStyled>
  );
};

const ErrorComponentStyled = styled.ul`
  color: #753333;
  background-color: #fde1e1;
  border-color: #fcd2d2;
  margin-top: 2rem;
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  transition: all 0.15s linear;

  li {
    color: #753333;
  }
`;

export default ErrorComponent;
