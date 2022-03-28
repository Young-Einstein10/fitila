import { Row } from "antd";
import styled from "styled-components";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";

const ProfileCardStyled = styled(Cards)`
  &.ant-card-body {
    min-height: 202px;
    background: navy-blue;

    .company-name-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;

      .company-image-wrapper {
        width: 97px;

        img {
          width: 100%;
          height: auto;
        }

        .img-placeholder {
          width: 97px;
          height: 97px;
        }
      }
    }
  }

  &.company-founder-wrapper {
    display: flex;
    align-items: center;

    .founder-image-wrapper {
      width: 50px;
      height: 50px;

      img {
        width: 100%;
        height: auto;
        border-radius: 50px;
      }

      .img-placeholder {
        width: 60px;
        height: 60px;
      }
    }

    .founder-name-wrapper {
      margin-left: 15px;
      font-weight: normal;

      p {
        margin: 0;
      }

      span {
        color: #a0a0a0;
      }
    }
  }
`;

const RowStyled = styled(Row)`
  .profile-summary-data {
    width: 100%;

    div {
      display: flex;
      align-items: center;

      span {
        flex: 1;

        :first-child {
          flex: 0 0 30%;
          color: #5b5b5b;
        }
      }
    }

    p {
      margin-bottom: 10px;

      strong {
        flex: 0 0 30%;
        color: #5b5b5b;
      }
    }
  }
`;

const StyledCompanyLogo = styled.div`
  display: flex;
  align-items: center;

  .company-image-wrapper {
    width: 100px;
    flex-shrink: 0;
    margin-right: 1.2rem;

    img {
      width: 100%;
      height: auto;
    }

    svg {
      height: 100px;
      width: 100px;
    }
  }
`;

const StyledCard = styled(Cards)`
  ${props => props.bgcolor && `background-color: ${props.bgcolor}`}

  &&.ant-card-head {
    ${props =>
      props.bgcolor && `background-color: ${props.bgcolor} !important;`}
  }

  .ant-card-body {
    ${props => props.bgcolor && `background-color: ${props.bgcolor};`}

    ${({ headless, theme }) =>
      headless &&
      `
        border-top-left-radius: ${theme["card-radius"]};
        border-top-right-radius: ${theme["card-radius"]};
      `};
  }
`;

export { ProfileCardStyled, StyledCard, RowStyled, StyledCompanyLogo };
