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
import EditTask from './edit_task';
import { connect } from 'react-redux';
import CreateTask from './create_task';
import Registration from './registration';



export default function root_init(node, store) {
  api.fetch_users();
  api.fetch_tasks();
  ReactDOM.render(
    <Provider store={store}>
      <Root tasks={window.tasks} />
    </Provider>, node);
}

let Root = connect((state) => state)((props) => {


    return <div>
      <Router>
        <div>
          <Header />
          <div className="row">
            <div className="col-8">
              <Route path="/" exact={true} render={() =>
                  <div>
                    <Link to={"tasks/new"} className="btn btn-primary">Create New Task</Link>
                    <TaskList />
                  </div>
              } />
              <Route path="/users" exact={true} render={() =>
                <UserList />
              } />
            <Route path="/registration" exact={true} render={() =>
                <Registration  />
              } />
            <Route path="/tasks/edit/:id" exact={true} render={() =>
                <EditTask />
              } />
            <Route path="/tasks/new" exact={true} render={() =>
                    <CreateTask />
              } />
            </div>
          </div>
        </div>
      </Router>
    </div>;
});


// <Route path="/tasks/:id" exact={true} render={() =>
//       <TaskList/>
//   } />
