import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import $ from 'jquery';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './header';



export default function root_init(node) {
  let prods = window.tasks;
  ReactDOM.render(<Root tasks= {window.tasks} />, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.tasks,
      users: [],
      session: null,
      sessioncreated: false,
    };
    this.fetch_users();
    // this.fetch_tasks();
  }

    fetch_path(path, on_success) {
    $.ajax(path, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: on_success,
    });
  }

  fetch_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let state1 = _.assign({}, this.state, { users: resp.data });
        this.setState(state1);
      }
    });
  }


  fetch_tasks() {
    this.fetch_path(
      "/api/v1/products",
      (resp) => {
        let state1 = _.assign({}, this.state, {
          tasks: resp.data,
        });
        this.setState(state1);
      }
    );
  }


  create_session(email, password) {
    $.ajax("/api/v1/sessions", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({email, password}),
      success: (resp) => {
        let state1 = _.assign({}, this.state, { session: resp.data, sessioncreated: true });
        this.setState(state1);
      }
    });
 }


  render() {
    return (
      <Router>
        <div>
          <Header root={this} session={this.state.session} sessioncreated={this.state.sessioncreated} />
        </div>
      </Router>
    );
  }
}
