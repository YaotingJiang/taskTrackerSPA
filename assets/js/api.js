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

  register_request(data, history) {
    $.ajax("/api/v1/newuser", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({user: data}),
      success: (resp) => {
        store.dispatch(
          {
            type: "ADD_USER",
            user: resp.data,

          }
        )
      history.push('/')
      //hisoty
      }
    });
  }

  delete_task_request(data) {
    console.log("What is the data " + data);
    $.ajax("/api/v1/tasks/" + data, {
      method: "delete",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        console.log("CHECK HERE")
        alert("this task is deleted")
        store.dispatch(
          {
            type: "TASK_DELETE",
            tasks: data,
          }
        )
        // history.push('/')
      },
      error: (resp) => {
        alert("something is wrong, please try again")
      }
    });
  }

  add_task_request(data, history) {
    console.log(data.token);
    console.log(data);
    $.ajax("/api/v1/tasks/", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({token: data.tokens, task: data}),
      success: (resp) => {
        alert("this task is added")
        store.dispatch(
          {
            type: "ADD_TASK",
            task: resp.data,
          }
        )
        history.push('/')
      },
      error: (resp) => {
        alert("something is wrong, please try again")
      }
    });
  }

  edit_task_request(id){
    console.log("edit task request " + id);
    $.ajax("/api/v1/tasks/" + id, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let showtask = {
          title: resp.data.title,
          desc: resp.data.desc,
          time: resp.data.time,
          completed: resp.data.completed,
          id: resp.data.id,
          user_id: resp.data.user_id,
        }
        store.dispatch(
          {
            type: "EDIT_TASK",
            task: showtask,
          }
        )
      },
      error: (resp) => {
        alert("something is wrong, please try again")
      }
    });
  }

  submit_edit_request(data, id, history) {
    console.log("submit id " + id);
    $.ajax("/api/v1/tasks/" + id, {
      method: "put",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({ task: data }),
      success: (resp) => {
        store.dispatch(
          {
            type: "SUBMIT_EDIT_TASK",
            task: resp.data,
          }
        )
        history.push('/')
      },
      error: (resp) => {
        alert("something is wrong, please try again")
      }
    });
  }
}

export default new TheServer();
