import Styled from "styled-components";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";

const ProfileCardStyled = Styled(Cards)`

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
        color: #A0A0A0;
      }
    }
  }
`;

export { ProfileCardStyled };
