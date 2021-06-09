import React, { FC, Fragment, useEffect } from "react";
import { useLocation, withRouter } from "react-router-dom";

const ScrollToTop: FC = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    if (location) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return <Fragment>{children}</Fragment>;
};

export default withRouter(ScrollToTop);
