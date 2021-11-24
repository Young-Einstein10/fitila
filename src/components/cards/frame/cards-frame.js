import React from "react";
import PropTypes from "prop-types";
import { CardFrame } from "./style";
import Heading from "../../heading/heading";
// import { Dropdown } from "../../dropdown/dropdown";
// import { ReactComponent as BurgerMenu } from "../../../static/svg/burgermenu.svg";

const Cards = props => {
  const {
    title,
    bgcolor,
    children,
    more,
    moreText,
    size,
    headless,
    caption,
    isbutton,
    bodyStyle,
    headStyle,
    style,
    border,
    loading,
    bodypadding,
    className,
    ...rest
  } = props;
  return (
    <>
      {!headless ? (
        <CardFrame
          className={className}
          size={size}
          title={title}
          bodyStyle={bodyStyle && bodyStyle}
          headStyle={headStyle && headStyle}
          bordered={border}
          loading={loading}
          bodypadding={bodypadding && bodypadding}
          // extra={
          //   <>
          //     {more && more}

          //     {isbutton && isbutton}
          //   </>
          // }
          style={{ ...style }}
          {...rest}
        >
          {children}
        </CardFrame>
      ) : (
        <CardFrame
          className={className}
          bodypadding={bodypadding && bodypadding}
          bodyStyle={bodyStyle && bodyStyle}
          size={size}
          style={{ ...style }}
          bordered={border}
          loading={loading}
          {...rest}
        >
          {title && <Heading as="h4">{title}</Heading>}
          {caption && <p>{caption}</p>}
          {children}
        </CardFrame>
      )}
    </>
  );
};

Cards.defaultProps = {
  border: false,
};

Cards.propTypes = {
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]),
  size: PropTypes.string,
  className: PropTypes.string,
  more: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.node,
  ]),
  style: PropTypes.object,
  bodyStyle: PropTypes.object,
  headStyle: PropTypes.object,
  isbutton: PropTypes.node,
  headless: PropTypes.bool,
  loading: PropTypes.bool,
  border: PropTypes.bool,
  bgcolor: PropTypes.string,
  caption: PropTypes.string,
  bodypadding: PropTypes.string,
  moreText: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.node,
  ]),
};

export { Cards };
