import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import api from './api';
import { Form, FormGroup, NavItem, Input, Button, Label } from 'reactstrap';
import { withRouter } from 'react-router';


function Registration(props) {
  console.log(props)
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_REGISTER_FORM',
      data: data,
    });
  }

  function submit() {
    api.register_request(props.register, props.history);
  }

  function clear(ev) {
    props.dispatch(
      {
        type: 'CLEAR_FORM',
      }
    )
  }

  return <div>
        <h3>Create a New User</h3>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input type="text" name="name" placeholder="name" value={props.register.name} onChange={update} />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" placeholder="email" value={props.register.email} onChange={update}/>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" placeholder="password" value={props.register.password} onChange={update}/>
            </FormGroup>
           <Button onClick = {submit}>Submit</Button>
          </Form>
  </div>
}


function state2props(state) { // <=
  console.log("rerender", state);
  return {
    register: state.register,
    // users: state.users,
  };
}

export default withRouter(connect(state2props)(Registration));
