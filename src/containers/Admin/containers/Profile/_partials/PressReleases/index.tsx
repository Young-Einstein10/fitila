import React from "react";
import { Col, Row, Menu, Dropdown, Button } from "antd";
import { Cards } from "../../../../../../components/cards/frame/cards-frame";
import FeatherIcon from "feather-icons-react";
import { Link, NavLink } from "react-router-dom";

import { UserOutlined } from "@ant-design/icons";
import { ReactComponent as ArrowDown } from "../../../../../../static/svg/arrowDown.svg";
import { TableHeaderButtonStyled } from "../../../Dashboard/_partials/Businesses";
import PostCover from "../../../../../../static/img/account_balance.png";
// import ImgPressRelease1 from "../../../../../../static/img/img_press_release_1.png";
// import ImgPressRelease2 from "../../../../../../static/img/img_press_release_2.png";
// import ImgPressRelease3 from "../../../../../../static/img/img_press_release_3.png";
// import ImgPressRelease4 from "../../../../../../static/img/img_press_release_4.png";
// import ImgPressRelease5 from "../../../../../../static/img/img_press_release_5.png";
// import ImgPressRelease6 from "../../../../../../static/img/img_press_release_6.png";
// import ImgPressRelease7 from "../../../../../../static/img/img_press_release_7.png";
// import ImgPressRelease8 from "../../../../../../static/8img/img_press_release_8.png";

import { ArticleColStyled, RowStyled } from "./styled";

const PressReleases = () => {
  const menu = (
    <Menu onClick={() => {}}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<UserOutlined />}>
        3rd menu item
      </Menu.Item>
    </Menu>
  );

  const content = (
    <>
      <NavLink to="#">
        <FeatherIcon size={16} icon="printer" />
        <span>Printer</span>
      </NavLink>
      <NavLink to="#">
        <FeatherIcon size={16} icon="book-open" />
        <span>PDF</span>
      </NavLink>
      <NavLink to="#">
        <FeatherIcon size={16} icon="file-text" />
        <span>Google Sheets</span>
      </NavLink>
      <NavLink to="#">
        <FeatherIcon size={16} icon="x" />
        <span>Excel (XLSX)</span>
      </NavLink>
      <NavLink to="#">
        <FeatherIcon size={16} icon="file" />
        <span>CSV</span>
      </NavLink>
    </>
  );

  return (
    <RowStyled className="press-releases">
      <Col xs={24}>
        <Cards
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>News and Press Releases</span>
              <Dropdown overlay={menu}>
                <TableHeaderButtonStyled type="ghost" size="middle">
                  Past Month <ArrowDown />
                </TableHeaderButtonStyled>
              </Dropdown>
            </div>
          }
          more={content}
        >
          <Row gutter={[24, 24]}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((article, key) => (
              <ArticleColStyled key={key} xs={24} sm={12} md={8} lg={6}>
                <Link to="#" className="company-post">
                  <article>
                    <div className="post-cover-wrapper">
                      <img src={PostCover} alt="Post Cover" />
                    </div>

                    <p className="date">October 19, 2020</p>
                    <p className="author">TECHCABAL</p>

                    <p className="title">
                      This is the tittle of a blog post, and it is this long
                    </p>

                    <span>Read More »</span>
                  </article>
                </Link>
              </ArticleColStyled>
            ))}

            <div className="load-more-btn text-center">
              <Button type="primary">Load More</Button>
            </div>
          </Row>
        </Cards>
      </Col>
    </RowStyled>
  );
};

export default PressReleases;
