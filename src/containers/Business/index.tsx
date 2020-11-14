import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddCompany from './_partials/AddCompany';
import ListOrganization from './_partials/ListOrganization';

const Business = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} component={AddCompany} />
      {/* <Route path={`${path}/listOrganization`} component={ListOrganization} /> */}
    </Switch>
  );
};

export default Business;
