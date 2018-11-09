import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import api from './api';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import Registration from './registration';

let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    api.get_login_request(props.login);
    console.log(props.login);
  }


  return <div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="text" name="email" placeholder="email"
               value={props.login.email} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="password" placeholder="password"
               value={props.login.passward} onChange={update} />
      </FormGroup>
      <Button onClick={create_token}>Log In</Button>
      <NavItem>
        <NavLink to="/registration" exact={true} activeClassName="active" className="nav-link">
          Register
        </NavLink>
      </NavItem>
    </Form>
  </div>;
});


let Session = connect(({token}) => {return {token};})((props) => {
  function delete_token(ev) {
      api.get_logout_request();
  }


  return <div className="navbar-text">
      <p></p>
      <span>|</span>
      <Button onClick={delete_token}>Log out</Button>
    </div>;
});


//<NavItem>
  //<NavLink to={"/users/" + props.token.user_id} href="#" className="nav-link">Your Tasks</NavLink>
//</NavItem>


function Header(props) {
  let session_info;
  if(props.token) {
    session_info = <Session token={props.token} />
  } else {
    session_info = <LoginForm />
  }


    return (
      <nav className="navbar navbar-light navbar-expand" style={{backgroundColor: "#e3f2fd"}}>
        <span className="navbar-brand">
          Task Tracker
        </span>
        <ul className="navbar-nav mr-auto">
          <NavItem>
            <NavLink to="/" exact={true} activeClassName="active" className="nav-link">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/users" href="#" className="nav-link">Users</NavLink>
          </NavItem>
        </ul>
        { session_info }
      </nav>
    );
}

function state2props(state) { // <=
  console.log("rerender", state);
  return {
    token: state.token,
  };
}

export default connect(state2props)(Header);
