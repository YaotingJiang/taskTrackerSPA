import store from './store';

class TheServer {

fetch_path(path, on_success) {
  $.ajax(path, {
    method: "get",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    data: "",
    success: on_success,
  });
}

send_post(path, data, callback) {
    $.ajax(path, {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: callback,
    });
  }

  fetch_users() {
    this.fetch_path(
      "/api/v1/users",
      (resp) => {
        store.dispatch({
          type: 'USER_LIST',
          data: resp.data,
        });
      }
    );
  }


  fetch_tasks() {
    this.fetch_path(
      "/api/v1/tasks",
      (resp) => {
        store.dispatch({
          type: 'TASK_LIST',
          data: resp.data,
        });
      }
    );
  }

  create_session(email, password) {
    this.send_post(
      "/api/v1/sessions",
      {email, password},
      (resp) => {
        store.dispatch({
          type: 'NEW_SESSION',
          data: resp.data,
        });
      }
    );
  }
}

// create_session(email, password) {
//   $.ajax("/api/v1/sessions", {
//     method: "post",
//     dataType: "json",
//     contentType: "application/json; charset=UTF-8",
//     data: JSON.stringify({email, password}),
//     success: (resp) => {
//       let state1 = _.assign({}, this.state, { session: resp.data, sessioncreated: true });
//       this.setState(state1);
//     }
//   });
//    console.log(this.props.tasks);
//  }
// }

export default new TheServer();
