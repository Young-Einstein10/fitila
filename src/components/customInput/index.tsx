import React from "react";
import styled from "styled-components";

const CustomInput = () => {
  const handleEvent = e => {
    document.querySelector("label .custom-label").classList.add("shrink");
  };

  return (
    <StyledInput>
      <label className="custom-label" htmlFor="email">
        Email
      </label>

      <input
        onClick={handleEvent}
        onFocus={handleEvent}
        type="email"
        id="email"
        name="email"
      />
    </StyledInput>
  );
};

const StyledInput = styled.div`
  position: relative;
  margin-bottom: 15px;

  label {
    display: block;
    font-size: 1.0625rem;
    line-height: 1.6470588235;
    font-family: Moderat Mono, monospace;
    font-weight: 500;

    position: absolute;
    top: 14px;
    left: 16px;
    margin: 0;
    opacity: 0.4;

    .shrink {
      position: absolute;
      top: 14px;
      left: 16px;
      margin: 0;
      opacity: 0.4;
    }
  }

  input {
    width: 100%;
    height: 56px;
    padding: 13px 15px;
    display: block;
    background: #fff;
    border: 1px solid #1f1f1f;
    border-radius: 0;
    color: #1f1f1f;
    font-size: 17px;
    font-size: 1.0625rem;
    line-height: 1.6470588235;
    font-family: Moderat Mono, monospace;
    font-weight: 500;
    outline: 0;
    padding-top: 15px;
    padding-bottom: 2px;

    :hover,
    :focus,
    :active {
      padding-bottom: 0;
      border-bottom: 3px solid #fc4d22;
    }
  }
`;

export default CustomInput;
