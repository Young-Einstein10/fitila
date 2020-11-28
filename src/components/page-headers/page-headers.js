import React from "react";
import PropTypes from "prop-types";
import { PageHeaderStyle } from "./style";

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
          // backgroundColor: bgColor || "#F4F5F7",
          ...style,
        }}
      >
        <PageHeaderStyle
          style={{
            // backgroundColor: "rgb(244, 245, 247)",
            ...style,
          }}
          // onBack={() => window.history.back()}
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
