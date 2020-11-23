import React from "react";
import { withRouter } from "react-router-dom";
import BusinessProvider from "./context";

const WithBusinessProvider = (WrappedComponent) => {
  const Business = (props) => {
    return (
      <BusinessProvider>
        <WrappedComponent {...props} />
      </BusinessProvider>
    );
  };

  return withRouter(Business);
};

export {WithBusinessProvider};
