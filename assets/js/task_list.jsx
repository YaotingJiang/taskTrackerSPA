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

  // write a edit function to edit the task.
  return <div className="card col-4">
    <div className="card-body">
      <h2 className="card-title">{task.title}</h2>
      <p className="card-text">
        <p>Description: {task.desc}</p>
        <p>Time: {task.time}</p>
        <p>Completed: {task.completed}</p>
      </p>
      <p className="form-inline">
        <button className="btn btn-primary">
          Edit
        </button>
      </p>
    </div>
  </div>;
}

function state2props(state) { // <=
  console.log("rerender", state);
  return {
    tasks: state.tasks,
    // counts: state.add_item_forms,
  };
}

// Export result of curried function call.
export default connect(state2props)(TaskList); // <=
