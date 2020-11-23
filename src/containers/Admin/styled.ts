import Styled from "styled-components";

const AdminSectionWrapper = Styled.section<{ background?: string }>`
  background: ${({ background }) => background && background};
  /* padding: 0 1.3rem 1.3rem; */
  /* min-height: calc(100vh - ()) */

  .text-center {
    text-align: center;
  }
`;

const CardStyleWrapper = Styled.div`
.ant-card{
  background: #F8F9FB;
}
.ant-card-head{
  border-color: #E3E6EF;
  background: #F8F9FB;
}
.ant-card-head .ant-card-head-title{
  padding: 12px 0;
}
.ant-card-head .ant-card-extra{
  display: block;
  padding: 12px 0;
  @media only screen and (max-width: 575px){
    margin-bottom: 4px;
  }
}
.ant-card.ant-card-bordered .ant-card-head{
  background: #fff;
}
.ant-card-head-wrapper .ant-card-extra a{
  color: #5F63F2;
}
.ant-card-body{
  padding: 22px 25px 15px 25px !important
}
.ant-card-body p{
  margin-bottom: 4px;
  color: ${({ theme }) => theme["gray-color"]};
}
.ant-card.ant-card-bordered {
  border-radius: 5px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #E3E6EF !important;
}
.ant-card-small > .ant-card-head{
  font-size: 16px;
  padding-left: 15px !important;
  padding-right: 15px !important;
}
.ant-card-small > .ant-card-body{
  padding: 12px 15px 8px 15px !important
}
`;

export { AdminSectionWrapper, CardStyleWrapper };
