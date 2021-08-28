import styled from "styled-components";

export const SocialWrapper = styled.ul`
  display: flex;
  align-items: center;
  margin: -6px;
  list-style: none;
  margin: 0;
  padding: 0;

  @media only screen and (max-width: 767px) {
    justify-content: center;
  }

  &.signin-social {
    li {
      a {
        box-shadow: 0 5px 15px ${({ theme }) => theme["light-color"]}10;
        background-color: #fff;
      }
    }
  }

  li {
    padding-right: 10px;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${({ theme }) => theme["text-color"]};
      font-weight: 500;

      span:not(.anticon) {
        display: inline-block;
        margin-left: 5px;
      }

      svg,
      i {
        width: 15px;
        height: 15px;
      }

      &.google-signup,
      &.google-signin {
        display: flex;
        align-items: center;
        padding: 0 30px;
        @media only screen and (max-width: 379px) {
          padding: 0 5px;
        }
        img {
          margin-right: 8px;
          @media only screen and (max-width: 379px) {
            margin-right: 4px;
          }
        }
      }
      &.facebook-sign {
        color: #475993;
      }
      &.twitter-sign {
        color: #03a9f4;
      }
    }
  }
`;
