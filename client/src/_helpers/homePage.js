import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashBoardPage from '../containers/dashboard';
import ProjectPage from '../containers/projects';
import TasksPage from '../containers/tasks';

/**
 * creates home Page 
 * @returns path
 */
const HomePage = () => {
  return (
    <Switch>
      <Route exact path="/projects" component={DashBoardPage} />
      <Route exact path="/projects/:id" component={ProjectPage} />
      <Route exact path="/projects/:id/tasks" component={TasksPage} />
    </Switch>
  );
};

export default HomePage;
