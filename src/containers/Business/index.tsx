import React from "react";
import BusinessProvider from "./context";

const WithBusinessProvider = WrappedComponent => {
  const Business = props => {
    return (
      <BusinessProvider>
        <WrappedComponent {...props} />
      </BusinessProvider>
    );
  };

  return Business;
};

export { WithBusinessProvider };
