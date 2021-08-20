import React from "react";
import PropTypes from "prop-types";
import { PageHeaderStyle } from "./style";
import "./style.less";

const PageHeader = props => {
  const {
    title,
    style,
    subTitle,
    routes,
    buttons,
    ghost,
    bgColor,
    ...rest
  } = props;
  return (
    <>
      <div
        style={{
          ...style,
        }}
      >
        <PageHeaderStyle
          style={{
            ...style,
          }}
          title={title}
          subTitle={subTitle}
          breadcrumb={routes && { routes }}
          extra={buttons}
          ghost={ghost}
          {...rest}
        />
      </div>
    </>
  );
};

PageHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  subTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  bgColor: PropTypes.string,
  style: PropTypes.object,
  routes: PropTypes.arrayOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  buttons: PropTypes.array,
  ghost: PropTypes.bool,
};

export { PageHeader };
