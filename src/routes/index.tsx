import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Category from '../pages/Category';
import Dashboard from '../pages/Dashboard';
import Expenses from '../pages/Expenses';
import Reference from '../pages/Reference';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/category" component={Category} />
      <Route path="/reference" component={Reference} />
      <Route path="/expenses" component={Expenses} />
    </Switch>
  );
};

export default Routes;
