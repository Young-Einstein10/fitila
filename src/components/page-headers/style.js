import { PageHeader } from "antd";
import styled from "styled-components";

const PageHeaderStyle = styled(PageHeader)`
  margin: 15px 0 !important;

  .ant-page-header-heading-title {
    font-size: 24px;
    font-weight: bold;
    text-transform: capitalize;
  }

  & .ant-page-header {
    background-color: none !important;
  }

  .page-header-actions button.ant-btn-white svg {
    width: 12px;
    height: 12px;
    ${({ theme }) => (theme.rtl ? "margin-left" : "margin-right")}: 2px;
    color: #5f63f2;
  }

  i + span,
  svg + span,
  img + span {
    ${({ theme }) => (!theme.rtl ? "margin-left" : "margin-right")}: 6px;
  }
`;

export { PageHeaderStyle };
