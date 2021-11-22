import { Tabs } from "antd";
import styled from "styled-components";

const { TabPane } = Tabs;

const TabColor = colors => `
  margin-bottom: 30px !important;

  .ant-tabs-nav{
    color : ${({ color }) =>
      color !== "default" &&
      color !== "#ffffff" &&
      color !== "#fff" &&
      color !== "white"
        ? "#ffffff"
        : "#000000"};
  }
  


  .ant-tabs-nav .ant-tabs-tab:hover, .ant-tabs-nav .ant-tabs-tab:focus {
    //background : ${colors !== "default" && colors};
    color : ${({ color }) =>
      color !== "default" &&
      color !== "#ffffff" &&
      color !== "#fff" &&
      color !== "white"
        ? "#ffffff"
        : "#000000"};
                margin-bottom: 0;

  }
  .ant-tabs-nav .ant-tabs-tab.ant-tabs-tab-active {
    border-radius: 3px;
    background : ${colors !== "default" && colors};
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
    color : ${
      colors !== "default" &&
      colors !== "#ffffff" &&
      colors !== "#fff" &&
      colors !== "white"
        ? "#ffffff"
        : "#5F63F2"
    };
  }
  .ant-tabs-ink-bar {
    background: transparent
  }
`;

const TabChildColor = color => `
  h1, h2, h3, h4, h5, h6, p, span, i {
    padding: 15px;
    background : ${color !== "default" && color};
    color : ${
      color !== "default" &&
      color !== "#ffffff" &&
      color !== "#fff" &&
      color !== "white"
        ? "#ffffff"
        : "#000000"
    };
    margin: 0;
  }
  
`;

const TabBasic = styled(Tabs)`
  margin-bottom: 30px !important;
  ${({ color }) => color && TabColor(color)};

  & > .ant-tabs-nav {
    background: #fff;
    padding-right: 1.3rem;
    margin-bottom: 0;
    position: fixed !important;
    top: 76px;
    right: 0;
    left: 300px;
    z-index: 3;

    @media only screen and (max-width: 1150px) {
      left: 0;
    }

    @media screen and (max-width: 1200px) and (min-width: 1150px) {
      left: 80px;
    }

    .ant-tabs-tab {
      margin: 15px 0;
      padding: 5px 15px;
      border-right: solid 1px #d0d4d9;
    }

    .ant-tabs-tab:first-child {
      margin-left: 1.3rem;
    }
  }

  & > .ant-tabs-content-holder {
    margin-top: 62px;
  }
`;

const Child = styled(TabPane)`
  padding: 1.3rem ${({ color }) => color && TabChildColor(color)};

  .ant-page-header {
    margin-top: 0 !important;
  }
`;

export { TabBasic, Child };
