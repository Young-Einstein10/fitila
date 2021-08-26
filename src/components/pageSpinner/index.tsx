import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";

const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;

export const PageSpinner = () => {
  return (
    <StyledPageContainer>
      <Spin indicator={antIcon} />
    </StyledPageContainer>
  );
};

const StyledPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
