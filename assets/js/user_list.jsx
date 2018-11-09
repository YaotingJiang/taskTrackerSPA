import React from 'react';
import { connect } from 'react-redux';



function UserList(props) {
  let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
  return <div className="container" style={{marginTop: "50px"}}>
    <h3>All Users</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>ID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
</div>;
}

function User(props) {
  let {user} = props;
  return <tr>
    <td>{user.email}</td>
    <td>{user.name}</td>
    <td>{user.id}</td>
  </tr>;
}


export default connect((state) => {return {users: state.users};})(UserList);
