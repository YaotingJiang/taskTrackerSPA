import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';



function tasks(state = [], action) {
  const state2 = Object.assign([], state);
  switch (action.type) {
    case 'TASK_LIST':
      return action.data;
    case 'ADD_TASK':
      return [action.task, ...state];
    case 'TASK_DELETE':
        const id = state.findIndex(tasks => {
          return tasks.id == action.data
     })
        console.log("OUTpUT ID HERE" + id)
        state2.splice(id, 1)
        console.log("STATE AFER DELETE " + id);
        return state2;
    default:
      return state;
      case 'SUBMIT_EDIT_TASK':
        const id2 = state.findIndex(tasks => {
          return tasks.id == action.data
        })
        state2.splice(id2, 1)
        return [action.task, ...state2];
  }
}

function users(state = [], action) {
  switch (action.type) {
    case 'USER_LIST':
      return action.data;
    case 'ADD_USER':
      return [action.user, ...state];
    default:
      return state;
  }
}

  let empty_form = {
    user_id: "",
    title: "",
    desc: "",
    time: 0,
    completed: false,
    token: "",
    id: "",
 }

function form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_FORM':
      return empty_form;
    case 'SET_TOKEN':
      return Object.assign({}, state, action.token);
    default:
      return state;
  }
}

function edit_task_form(state = empty_form, action) {
  console.log(action);
  switch (action.type) {
    case 'CLEAR_FORM':
      return empty_form;
    case 'UPDATE_TASK':
      return Object.assign({}, state, action.data);
    case 'EDIT_TASK':
      return Object.assign({}, state, action.task);
    default:
      return state;
  }
}

let empty_token = {
  name: "",
  id: "",
}

function token(state = null, action) {
  switch(action.type) {
    case 'SET_TOKEN':
      return action.token;
    default:
      return state;
  }
}

  let userlogin = {
    email: "",
    password: "",
  }

 function login(state = userlogin, action) {
   switch(action.type) {
     case 'UPDATE_LOGIN_FORM':
       return Object.assign({}, state, action.data);
     default:
       return state;
   }
 }

 let userregister = {
   email: "",
   name: "",
   password: "",
 }

 function register(state = userlogin, action) {
   switch(action.type) {
     case 'UPDATE_REGISTER_FORM':
       return Object.assign({}, state, action.data);
     case 'CLEAR_FORM':
       return userregister;
     default:
       return state;
   }
 }

 function create_task_form(state = empty_form, action) {
   switch(action.type) {
     case 'UPDATE_TASK':
      return Object.assign({}, state, action.data);
     case 'CLEAR_FORM':
      return empty_form;
    default:
      return state;
   }
 }


function root_reducer(state0, action) {
  console.log("reducer", state0, action);

  let reducer = combineReducers({tasks, users, form, token, login, edit_task_form, register, create_task_form});
  let state1 = reducer(state0, action);

  console.log("reducer1", state1);

  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
