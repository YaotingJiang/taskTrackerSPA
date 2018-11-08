import React from 'react';
import { connect } from 'react-redux';
import api from './api';
import { Form, FormGroup, NavItem, Input, Button, Label } from 'reactstrap';
import _ from 'lodash';
import { withRouter } from 'react-router';

function NewTask(props) {
  console.log(props.create_task_form)
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_TASK',
      data: data,
    });
  }

  function submit() {
    api.add_task_request(props.create_task_form, props.history)
    clear();
  }

  function clear(ev) {
    props.dispatch(
      {
        type: 'CLEAR_FORM',
      }
    )
  }

  return <div>
        <h3>Create a New Task</h3>
          <Form>
            <FormGroup>
              <Label for="user_id">Assigned To</Label>
              <Input type="text" name="user_id" placeholder="user_id" value={props.create_task_form.user_id} onChange={update} />
            </FormGroup>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="title" placeholder="title" value={props.create_task_form.email} onChange={update}/>
            </FormGroup>
            <FormGroup>
              <Label for="desc">Description</Label>
              <Input type="text" name="desc" placeholder="desc" value={props.create_task_form.desc} onChange={update}/>
            </FormGroup>
            <FormGroup>
              <Label for="time">Time</Label>
              <Input type="number" name="time" placeholder="time" min="0" step="15" value={props.create_task_form.time} onChange={update}/>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="completed" value={props.create_task_form.completed} onChange={update}/>
                Completed
               </Label>
            </FormGroup>
           <Button onClick = {submit}>Submit</Button>
          </Form>
  </div>;
}

  function state2props(state) { // <=
    console.log("rerender", state);
    return {
      create_task_form: state.create_task_form,
      // users: state.users,
    };
  }

  export default withRouter(connect(state2props)(NewTask));
