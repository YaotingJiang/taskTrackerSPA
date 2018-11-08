import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api';
import EditTask from './edit_task';
import ReactDOM from 'react-dom';
import $ from "jquery";
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';


function TaskList(props) {
  let {root, tasks, dispatch} = props;
  let prods = _.map(tasks, (tt) =>
    <Task key={tt.id} task={tt} root={root} dispatch= {dispatch} />);
     return <div className="container" style={{marginTop: "35px"}}><div className="row">
    {prods}
  </div>
</div>;
}


function Task(props) {
  let {root, task, dispatch} = props;

  function delete_task() {
    api.delete_task_request(task.id, props.history)
    console.log("task id:" + task.id);
  }

  function edit_task() {
    api.edit_task_request(task.id);
  }

  if(task.completed) {
    var complete = "Yes";
  } else {
    var complete = "No";
  }

  //<p>Assigned To: {task.user.name}</p>
  return <div className="card col-4" style={{marginLeft: "10px"}}>
    <div className="card-body">
      <h2 className="card-title">{task.title}</h2>
      <div className="card-text">
        <p>Assigned To: {task.user.name}</p>
        <p>Description: {task.desc}</p>
        <p>Time: {task.time}</p>
        <p>Completed: {complete}</p>
      </div>
      <p className="form-inline">
        <Link to={"tasks/edit/" + task.id} onClick={edit_task} className="btn btn-primary">
          Edit
        </Link>
        <button className="btn btn-danger" onClick={delete_task}>
          Delete
        </button>
      </p>
    </div>
  </div>;
 }

function state2props(state) { // <=
  console.log("rerender", state);
  return {
    tasks: state.tasks,
    // form: state.form,
    users: state.users,
    // counts: state.add_item_forms,
  };
}

// Export result of curried function call.
export default withRouter(connect(state2props)(TaskList)); // <=
