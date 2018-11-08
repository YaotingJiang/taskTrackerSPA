import React from 'react';
import { connect } from 'react-redux';
import api from './api';
import { Form, FormGroup, NavItem, Input, Button, Label } from 'reactstrap';
import _ from 'lodash';

function CreateTask(props) {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] == tgt.val();

    if((tgt).is(':checked')) {
      data.completed = true
    }

    props.dispatch({
      type: 'ADD_TASK',
      data: data,
    });
  }

  function submit(ev){
    api.add_task_request(props.form);
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

  return <div id="editing">
          <Form>
            <FormGroup>
              <Label for="user_id">Assigned To</Label>
              <Input type="text" name="user_id" placeholder="id" value={props.form.user_id} onChange={update} />
            </FormGroup>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="title" placeholder="title" value={props.form.title} onChange={update}/>
            </FormGroup>
            <FormGroup>
              <Label for="desc">Description</Label>
              <Input type="text" name="desc" placeholder="desc" value={props.form.desc} onChange={update}/>
            </FormGroup>
            <FormGroup>
              <Label for="time">Time</Label>
              <Input type="number" name="time" min="0" step="15" value={props.form.time} onChange={update}/>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" name="completed" value={props.form.completed} onChange={update}/>
                Completed
               </Label>
            </FormGroup>
           <Button onClick = {submit}>Create</Button>
        </Form>
  </div>
}


function state2props(state) { // <=
  console.log("rerender", state);
  return {
    form: state.form,
    users: state.users,
  };
}

export default connect(state2props)(CreateTask);
