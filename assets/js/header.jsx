import React from 'react';
import { Link } from 'react-router-dom';
import api from './api';

export default function Header(props) {
  let {root, session} = props;

  function userlogin() {
    let email = $('#login-email').val();
    let password = $('login-pass').val();
    api.create_session(email, password);
  }


  function userlogout() {
    props.dispatch({
      type: 'DESTROY_TOKEN'
    })
  }

  let session_view = <div className="form-inline my-2">
    <input id="login-email" type="email" placeholder="email" />
    <input id="login-pass" type="password" placeholder="password" />
    <button className="btn btn-secondary" onClick={userlogin}>Login</button>
  </div>;

  let login_view = <div className="form-inline my-2">
    <p></p>
    <button className="btn btn-secondary">Logout</button>
  </div>

  // if(sessioncreated) {
  //   return <div className="row my-2">
  //     <div className="col-4">
  //       <h1><Link to={"/"} onClick={root.fetch_tasks.bind(root)}>Task Tracker</Link></h1>
  //     </div>
  //     <div className="col-2">
  //       <p><Link to={"/users"} onClick={root.fetch_users.bind(root)}>Users</Link></p>
  //     </div>
  //     <div className="col-6">
  //         {login_view}
  //     </div>
  //   </div>;
  // } else {
    return <div className="row my-2">
      <div className="col-4">
        <h1><Link to={"/"} onClick={api.fetch_tasks()}>Task Tracker</Link></h1>
      </div>
      <div className="col-2">
        <p><Link to={"/users"} onClick={api.fetch_users()}>Users</Link></p>
      </div>
      <div className="col-6">
          {session_view}
        </div>
      </div>;
  // }
}
