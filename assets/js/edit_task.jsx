import React from 'react';
import { connect } from 'react-redux';
import api from './api';
import { Form, FormGroup, NavItem, Input, Button, Label } from 'reactstrap';
import _ from 'lodash';
import { withRouter } from 'react-router';

function EditTask(props) {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] == tgt.val();

    if((tgt).is(':checked')) {
      data.completed = true
    }

    props.dispatch({
      type: 'UPDATE_TASK',
      data: data,
    });
  }

  function submit(ev){
    console.log("edit task form " + props.edit_task_form);
    console.log("edit task form id " + props.edit_task_form.id);
    api.submit_edit_request(props.edit_task_form, props.edit_task_form.id, props.history);
    clear();
  }

  function clear(ev) {
    props.dispatch(
      {
        type: 'CLEAR_FORM',
      }
    )
  }

  let users = (_.map(props.users, (uu) =>
  <option key={uu.id} value={uu.id}>{uu.name}</option>));
  console.log("edit task ", props.edit_task_form);
  return <div id="editing">
          <Form>
            <FormGroup>
              <Label for="user_id">Assigned To</Label>
              <Input type="text" name="user_id" placeholder="id" value={props.edit_task_form.user_id} onChange={update} />
            </FormGroup>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="title" placeholder="title" value={props.edit_task_form.title} onChange={update}/>
            </FormGroup>
            <FormGroup>
              <Label for="desc">Description</Label>
              <Input type="text" name="desc" placeholder="desc" value={props.edit_task_form.desc} onChange={update}/>
            </FormGroup>
            <FormGroup>
              <Label for="time">Time</Label>
              <Input type="number" name="time" min="0" step="15" value={props.edit_task_form.time} onChange={update}/>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="completed" value={props.edit_task_form.completed} onChange={update}/>
                Completed
               </Label>
            </FormGroup>
           <Button onClick = {submit}>Submit</Button>
          </Form>
  </div>
}


function state2props(state) { // <=
  console.log("rerender", state);
  return {
    edit_task_form: state.edit_task_form,
    users: state.users,
  };
}

export default withRouter(connect(state2props)(EditTask));
