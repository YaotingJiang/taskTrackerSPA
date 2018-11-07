import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';



function tasks(state = [], action) {
  switch (action.type) {
    case 'TASK_LIST':
      return action.data;
    default:
      return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
    case 'USER_LIST':
      return action.data;
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
    creator_id: "",
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


function root_reducer(state0, action) {
  console.log("reducer", state0, action);

  let reducer = combineReducers({tasks, users, form, token, login, register});
  let state1 = reducer(state0, action);

  console.log("reducer1", state1);

  return deepFreeze(state1);
}

let store = createStore(root_reducer);
export default store;
