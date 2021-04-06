import { Button } from "antd";
import Styled from "styled-components";

const Div = Styled.div`
    position: relative;
    header{
        box-shadow: 0px 2px 8px rgba(53, 55, 81, 0.04);
        ${({ darkMode }) => (darkMode ? `background: #272B41;` : "")};
        z-index: 999;        
        padding: 0 3rem;

        @media screen and (max-width: 1200px) {
            padding-left: 0;
            padding-right: 0;        
        }

        @media screen and (max-width: 375px) {
            .user-info {
                display: none;                
            }
        }
     

        .navitem-left {
            display: flex;
            align-items: center;

            .ant-breadcrumb {
                margin-left: 4rem;
                color: #000000;
                font-size: 1rem;
            }

            @media screen and (max-width: 992px) {
                .ant-breadcrumb {
                    display: none;
                }
            }
        }


        .ant-btn-link{
            ${({ darkMode }) =>
              darkMode
                ? `background: #272B41;border-color: #272B41;color: #7D808D !important`
                : ""};
        }

        .head-example{
            ${({ darkMode }) => (darkMode ? `color: #A8AAB3;` : "")};
        }
        .ant-menu-sub.ant-menu-vertical{
            .ant-menu-item{
                a{
                    color: ${({ theme }) => theme["gray-color"]};
                }
            }
        }
        .ant-menu.ant-menu-horizontal{
            display: flex;
            align-items: center;
            margin: 0 -16px;
            li.ant-menu-submenu{
                margin: 0 16px;
            }
            .ant-menu-submenu{
                &.ant-menu-submenu-active,
                &.ant-menu-submenu-selected,
                &.ant-menu-submenu-open{
                    .ant-menu-submenu-title{
                        color: ${({ darkMode }) =>
                          darkMode ? `#fff;` : "#5A5F7D"};
                        svg,
                        i{
                            color: ${({ darkMode }) =>
                              darkMode ? `#fff;` : "#5A5F7D"};
                        }
                    }
                }
                .ant-menu-submenu-title{
                    font-size: 14px;
                    font-weight: 500;
                    color: ${({ darkMode }) =>
                      darkMode ? `#ffffff90;` : "#5A5F7D"};
                    svg,
                    i{
                        color: ${({ darkMode }) =>
                          darkMode ? `#ffffff90;` : "#5A5F7D"};
                    }
                    .ant-menu-submenu-arrow{
                        font-family: "FontAwesome";
                        font-style: normal;
                        ${({ theme }) =>
                          theme.rtl ? "margin-right" : "margin-left"}: 6px;
                        &:after{
                            color: ${({ darkMode }) =>
                              darkMode ? `#ffffff90;` : "#9299B8"};
                            content: '\f107';
                            background-color: transparent;
                        }
                    }
                }
            }
        }
       

    }
    .header-more{
        .head-example{
            ${({ darkMode }) => (darkMode ? `color: #A8AAB3;` : "")};
        }
    }

    .striking-logo{
        @media only screen and (max-width: 875px){
            ${({ theme }) => (theme.rtl ? "margin-left" : "margin-right")}: 4px;
        }
        @media only screen and (max-width: 767px){
            ${({ theme }) => (theme.rtl ? "margin-left" : "margin-right")}: 0;
        }
        img{
            max-width: ${({ theme }) => (theme.topMenu ? "140px" : "120px")};
            width: 100%;
        }
        &.top-menu{
            ${({ theme }) =>
              theme.rtl ? "margin-right" : "margin-left"}: 15px;
        }
    }
    .certain-category-search-wrapper{
        ${({ darkMode, theme }) =>
          darkMode
            ? `${
                !theme.rtl ? "border-right" : "border-left"
              }: 1px solid #272B41;`
            : ""};
         @media only screen and (max-width: 767px){
            padding: 0 15px;
        }
        input{
            max-width: 350px;
            ${({ darkMode }) => (darkMode ? `background: #272B41;` : "")};
            ${({ darkMode }) => (darkMode ? `color: #fff;` : "#5A5F7D")};
            @media only screen and (max-width: 875px){
                ${({ theme }) =>
                  !theme.rtl ? "padding-left" : "padding-right"}: 5px;
            }
        }
    }
    
    .navbar-brand{
        button{
            padding: ${({ theme }) =>
              theme.rtl ? "0 15px 0 25px" : "0 25px 0 15px"};
            line-height: 0;
            margin-top: 4px;
            color: ${({ theme }) => theme["extra-light-color"]};
            @media only screen and (max-width: 875px){
                padding: ${({ theme }) =>
                  theme.rtl ? "0 10px 0 25px" : "0 25px 0 10px"};
            }
            @media only screen and (max-width: 767px){
                padding: ${({ theme }) =>
                  theme.rtl ? "0 0px 0 15px" : "0 15px 0 0px"};
            }
        }
    }

    /* Sidebar styles */
    .ant-layout-sider{
        box-shadow: 0 0 30px #9299B810;
        @media (max-width: 991px){
            box-shadow: 0 0 10px #00000020;
        }
        &.ant-layout-sider-dark{
            background: ${({ theme }) => theme["dark-color"]};
            .ant-layout-sider-children{
                .ant-menu{
                    .ant-menu-submenu-inline{
                        > .ant-menu-submenu-title{
                            padding: 0 30px !important;
                        }
                    }
                    .ant-menu-item{
                        padding: 0 30px !important;
                    }
                }
            }
        }
        
        .ant-layout-sider-children{
            padding-bottom: 15px;
            >.sidebar-nav-title{
                margin-top: 8px;
            }

            .ant-menu{
                overflow-x: hidden;
                ${({ theme }) =>
                  theme.rtl ? "border-left" : "border-right"}: 0 none;
                .ant-menu-submenu, .ant-menu-item{
                    .feather{
                        width: 16px;
                        font-size: 16px;
                        color: ${({ theme }) => theme["extra-light-color"]};
                    }
                    span{
                        ${({ theme }) =>
                          !theme.rtl ? "padding-left" : "padding-right"}: 20px;
                        display: inline-block;
                        color: ${({ theme }) => theme["dark-color"]};
                        transition: 0.3s ease;
                    }
                }
                .ant-menu-submenu{
                    .ant-menu-submenu-title{
                        display: flex;
                        align-items: center;
                    }
                }
                .ant-menu-submenu-inline{
                    > .ant-menu-submenu-title{
                        display: flex;
                        align-items: center;
                        padding: 0 15px !important;
                        svg,
                        img{
                            width: 16px;
                            height: 16px;
                        }
                                                
                        .ant-menu-submenu-arrow{
                            right: auto;
                            ${({ theme }) =>
                              theme.rtl ? "left" : "right"}: 24px;
                            &:after,
                            &:before{
                                width: 7px;
                                background: #868EAE;
                                height: 1.25px;
                            }
                            &:before{
                                transform: rotate(45deg) ${({ theme }) =>
                                  !theme.rtl
                                    ? "translateY(-3.3px)"
                                    : "translateY(3.3px)"};
                            }
                            &:after{
                                transform: rotate(-45deg) ${({ theme }) =>
                                  theme.rtl
                                    ? "translateY(-3.3px)"
                                    : "translateY(3.3px)"};
                            }
                        }
                    }
                    &.ant-menu-submenu-open{
                        > .ant-menu-submenu-title{
                            .ant-menu-submenu-arrow{
                                transform: translateY(4px);
                                &:before{
                                    transform: rotate(45deg) translateX(-3.3px);
                                }
                                &:after{
                                    transform: rotate(-45deg) translateX(3.3px);
                                }
                            }
                        }
                    }
                    .ant-menu-item{
                        ${({ theme }) =>
                          theme.rtl
                            ? "padding-right"
                            : "padding-left"}: 50px !important;
                        ${({ theme }) =>
                          theme.rtl
                            ? "padding-left"
                            : "padding-right"}: 0 !important;
                        transition: all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) 0s;
                    }
                }
                .ant-menu-item{
                    display: flex;
                    align-items: center;
                    padding-left: 3rem !important;
                    &.ant-menu-item-active{
                        border-radius: 4px;
                        
                        a {
                            color: ${({ theme }) => theme["primary-color"]};

                        }
                    }
                    a{
                        display: flex !important;
                        align-items: center;
                        .feather{
                            width: 16px;
                            color: ${({ theme }) => theme["extra-light-color"]};
                        }
                        span{
                            ${({ theme }) =>
                              !theme.rtl
                                ? "padding-left"
                                : "padding-right"}: 20px;
                            display: inline-block;
                            color: ${({ theme }) => theme["dark-color"]};
                        }
                    }
                    &.ant-menu-item-selected{
                        color: ${({ theme }) => theme["primary-color"]}
                        background-color: ${({ theme }) =>
                          theme["primary-hover"]};

                        a, a:hover  {
                            color: ${({ theme }) => theme["primary-color"]}
                            font-weight: bold;
                        }

                        svg,
                        i{
                            color: ${({ theme }) => theme["primary-color"]};
                        }
                    }
                }

                .ant-menu-item-active {
                    a {
                        color: ${({ theme }) => theme["primary-color"]}
                    }
                }

                .ant-menu-submenu,
                .ant-menu-item{
                    ${({ theme }) => theme.rtl && `padding-right: 5px;`}
                    
                    &.ant-menu-item-selected{
                        border-radius: 4px;
                        &:after{
                            content: none;
                        }
                    }
                    &.ant-menu-submenu-active{
                        border-radius: 4px;
                        ${({ darkMode }) =>
                          darkMode
                            ? `background-color: rgba(255, 255, 255, .05);`
                            : ""};
                    }
                }
                .sidebar-nav-title{
                    margin-top: 40px;
                    margin-bottom: 24px;
                }
                &.ant-menu-inline-collapsed{
                    .ant-menu-submenu{
                        text-align: ${({ theme }) =>
                          !theme.rtl
                            ? "left"
                            : "right"};                        
                        .ant-menu-submenu-title{
                            padding: 0 20px;
                            justify-content: center;
                        }
                    }
                    .ant-menu-item{
                        padding: 0 20px !important;
                        justify-content: center;
                    }
                    .ant-menu-submenu, .ant-menu-item{
                        span{
                            display: none;
                        }
                    }
                }
            }
        }
        .sidebar-nav-title{
            font-size: 12px;
            font-weight: 500;
            text-transform: uppercase;
            ${({ darkMode }) =>
              darkMode
                ? `color: rgba(255, 255, 255, .38);`
                : "color: #9299B8;"};
            padding: 0 ${({ theme }) => (theme.rtl ? "20px" : "15px")};
            display: flex;
        }
        &.ant-layout-sider-collapsed{
            padding: 15px 0px 55px !important;
            .sidebar-nav-title{
                display: none;
            }
            & + .atbd-main-layout{
                ${({ theme }) =>
                  !theme.rtl ? "margin-left" : "margin-right"}: 80px;
            }
        }
    }
    @media only screen and (max-width: 1150px){
        .ant-layout-sider.ant-layout-sider-collapsed{
            ${({ theme }) => (!theme.rtl ? "left" : "right")}: -80px !important;
        }

    }

    .atbd-main-layout{
    /* ${({ theme }) => (!theme.rtl ? "margin-left" : "margin-right")}: ${({
  theme,
}) => (theme.topMenu ? 0 : "220px")}; */
        margin-left: 220px;
        margin-top: 64px;
        transition: 0.3s ease;
        @media only screen and (max-width: 1150px){
            /* ${({ theme }) =>
              !theme.rtl ? "margin-left" : "margin-right"}: auto !important; */
            margin-left: auto !important;
    }

    /* Mobile Actions */
    .mobile-action{
        position: absolute;
        ${({ theme }) => (theme.rtl ? "left" : "right")}: 20px;
        top: 50%;
        transform: translateY(-50%);
        display: inline-flex;
        align-items: center;
        @media only screen and (max-width: 767px){
            ${({ theme }) => (theme.rtl ? "left" : "right")}: 0;
        }
        a{
            display: inline-flex;
            color: ${({ theme }) => theme["light-color"]};
            &.btn-search{
                ${({ theme }) =>
                  theme.rtl ? "margin-left" : "margin-right"}: 18px;
            }
            svg{
                width: 20px
                height: 20px;
            }
        }
    }
    .admin-footer{
        .admin-footer__copyright{
            display: inline-block;
            width: 100%;
            color: ${({ theme }) => theme["light-color"]};
            @media only screen and (max-width: 767px){
                text-align: center;
                margin-bottom: 2rem;
            }
        }
        .admin-footer__links{
            text-align: right;
            
            @media only screen and (max-width: 767px){
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            a{
                color: ${({ theme }) => theme["light-color"]};

                &:not(:last-child){
                  margin-right: 15px;                      
                }

                @media only screen and (max-width: 767px){
                  &:not(:last-child), &:last-child {
                      margin: 0.6rem 0
                  }
                }

                &:hover{
                    color: ${({ theme }) => theme["primary-color"]};
                }

            }
        }
    }    
`;

const SidebarFooterStyled = Styled.footer`
    font-size: 12px;
    /* margin-top: 3rem; */
    color: #81868C;
    padding-left: 3rem;
    position: absolute;
    bottom: 0;

    p {
        /* margin-left: 20px; */
    }

    ul {
        list-style: none;
        text-decoration: underline;
        /* margin-left: 20px; */
        padding: 0;
    }
`;

const CurrentUserButton = Styled(Button)`

    background: #F7F9FA;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 0;

    &:hover, &:active, &:focus {
        background: #F7F9FA;
        color: inherit;
        border: 0;
    }


    span:first-child {
        height: 30px;
        width: 30px;
        border-radius: 50px;
        margin-right: 10px
        background: #e6e6e6
    }
`;

export { Div, SidebarFooterStyled, CurrentUserButton };
