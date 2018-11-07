import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import api from './api';

function TaskList(props) {
  let {root, tasks} = props;
  let prods = _.map(tasks, (tt) =>
    <Task key={tt.id} task={tt} root={root} />);
     return <div className="row">
    {prods}
  </div>;
}

function Task(props) {
  let {root, task} = props;
  // let changed = (ev) => {
  //   root.update_add_cart_count(product.id, ev.target.value);
  // };

  function delete_task() {
    api.delete_task_request(task.id)
    console.log("task id:" + task.id);
  }

  function edit_task() {
    $('edit-task-form').show();
    props.dispatch({
      type: 'CLEAR_FORM'
    })
    $('input[name="id"]').val(task.id);
  }
  // write a edit function to edit the task.
  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{task.title}</h2>
      <div className="card-text">
        <p>Description: {task.desc}</p>
        <p>Time: {task.time}</p>
        <p>ID: {task.id}</p>
        <p>Completed: {task.completed}</p>
      </div>
      <p className="form-inline">
        <button className="btn btn-primary" onClick={edit_task}>
          Edit
        </button>
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
    form: state.form,
    users: state.users,
    // counts: state.add_item_forms,
  };
}

// Export result of curried function call.
export default connect(state2props)(TaskList); // <=
