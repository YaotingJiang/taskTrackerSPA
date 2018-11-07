import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './header';
import UserList from './user_list';
import TaskList from './task_list';
import { Provider } from 'react-redux';
import api from './api';


export default function root_init(node, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Root tasks={window.tasks} />
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    api.fetch_users();
    api.fetch_tasks();

  }

  render() {
    return <div>
      <Router>
        <div>
          <Header />
          <div className="row">
            <div className="col-8">
              <Route path="/" exact={true} render={() =>
                <TaskList />
              } />
              <Route path="/users" exact={true} render={() =>
                <TaskList />
              } />
            </div>
          </div>
        </div>
      </Router>
    </div>;
  }
}
