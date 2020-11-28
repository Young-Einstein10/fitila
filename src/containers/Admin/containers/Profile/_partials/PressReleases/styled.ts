import { Row, Col } from "antd";
import Style from "styled-components";

const RowStyled = Style(Row)`

  .text-center {
    text-align: center;
  }

  div.load-more-btn {
    width: 100%;
    padding: 2rem 0;
  }
`;

const ArticleColStyled = Style(Col)`
  
  .company-post {
  

    article {

      .post-cover-wrapper {
        width: 100%;

        img {
          width: 100%
          height: auto
        }
      }

      p {
        margin-bottom: 10px;
      }
      
      p.date, p.author {
        color: #A0A0A0;
        font-size: 12px;
      }

      p.date {
        font-weight: bold;
        margin: 5px 0;
      }

      p.title {
        color: #000;
        font-size: 16px;
        font-weight: 600;
      }

      span {
        font-size: 14px;
        color: #1D429C;
      }
    }
  }
`;

export { RowStyled, ArticleColStyled };
