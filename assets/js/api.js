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

  get_login_request(data) {
    $.ajax("/api/v1/sessions", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch(
          {
            type: "SET_TOKEN",
            token: resp,
          }
        )
      },

      error: (resp) => {
        alert("email or password is not correct, please try again")
      }
    });
  }

  get_logout_request(data) {
    $.ajax("/api/v1/sessions", {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch(
          {
            type: "SET_TOKEN",
            token: null,
          }
        )
      }
    });
  }

  add_task_request() {
    $.ajax("/api/v1/tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        alert("new task is created")
        store.dispatch(
          {
            type: "ADD_TASK",
            token: null,
          }
        )
      },
      error: (resp) => {
        alert("something is wrong, please try again")
      }
    });
  }

  delete_task_request(data) {
    console.log(data);
    $.ajax("/api/v1/tasks/" + data, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        alert("this task is deleted")
        store.dispatch(
          {
            type: "TASK_LIST",
            tasks: resp.data,
          }
        )
      },
      error: (resp) => {
        alert("something is wrong, please try again")
      }
    });
  }

}

export default new TheServer();
