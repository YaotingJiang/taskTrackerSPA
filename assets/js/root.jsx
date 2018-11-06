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


// export default function root_init(node) {
//   let prods = window.tasks;
//   ReactDOM.render(<Root tasks= {window.tasks} />, node);
// }

class Root extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   products: props.tasks,
    //   users: [],
    //   tasks: [],
    //   session: null,
    //   sessioncreated: false,
    // };

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



  // render() {
  //   return (
  //     <Router>
  //       <div>
  //         <Header root={this} session={this.state.session} />
  //         <div className="container">
  //           <Route path="/" exact={true} render={() =>
  //               <TaskList root={this}
  //                            tasks={this.props.tasks}/>
  //
  //               } />
  //             <Route path="/users" exact={true} render={() =>
  //               <UserList users={this.state.users} />
  //             } />
  //         </div>
  //       </div>
  //     </Router>
  //   );
  // }
