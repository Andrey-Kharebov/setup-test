import React, { useEffect, useState } from 'react';
import classes from './UsersTableComponent.module.css';
import EditingForm from './EditingForm/EditingForm';
import { connect } from 'react-redux';
import { removeUser, setFilteredUsers, updateUser } from '../../redux/reducers/users-reducer';

function UsersTableComponent({ users, updateUser, removeUser, filteredUsers, setFilteredUsers, activeFilter }) {
  
  const [editingUser, setEditingUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setEditMode(false);
  }, [])

  const editModeActivator = (user) => {
    setEditMode(true);
    setEditingUser(user);
  }

  const editHandler = (event) => {
    setEditingUser({...editingUser, [event.target.name]: event.target.value})
  }

  const saveUpdatesHandler = (item) => {
    let date = new Date(); 
    let now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
      date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); // console.log(new Date(now_utc)) => console.log(new Date(now_utc)) 

    let dateWithoutGMT = new Date(now_utc).toString();
    dateWithoutGMT = dateWithoutGMT.split(' ').splice(0, 5).join(' ');
    
    item.updated_at = dateWithoutGMT;

    updateUser(item);
    if (activeFilter) {
      setFilteredUsers(activeFilter);
    }
    setEditMode(false);
    setEditingUser(null);
  }
  
  const removeHandler = (user) => {
    removeUser(user);
    if (activeFilter) {
      setFilteredUsers(activeFilter);
    }
    setEditMode(false);
    setEditingUser(null);
  }

  return (
    <div className={ classes.usersTable }>
      <table className="responsive-table highlight">
        <thead>
          <tr>
              <th>Full name</th>
              <th>Created_at</th>
              <th>Updated_at</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          { users.length &&  (filteredUsers || users).map(user => {
            if (editMode && user.id === editingUser.id) {
              return (
                <tr className={ classes.editMode } key={ user.id }>
                  <EditingForm 
                    editingUser={ editingUser } 
                    editHandler={ editHandler } 
                    updateUser={ updateUser } 
                    saveUpdatesHandler={ saveUpdatesHandler } 
                  />
                </tr>
                )
            } else {
              return (
                <tr key={ user.id }>
                  <td>{ user.name }</td>
                  <td>{ user.created_at }</td>
                  <td>{ user.updated_at }</td>
                  <td>{ user.email }</td>
                  <td>{ user.password }</td>
                  <td>{ user.phone }</td>
                  <td>{ user.status }</td>
                  <td className={ classes.actions }>
                    <button className="btn blue" onClick={ () => { editModeActivator(user) } }>Edit</button>
                    <button className={ editingUser ? "btn orange disabled" : "btn orange" } onClick={ () => {removeHandler(user)} }>Remove</button>
                  </td>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.users,
    activeFilter: state.usersReducer.activeFilter,
    filteredUsers: state.usersReducer.filteredUsers
  }
}

export default connect(mapStateToProps, {removeUser, updateUser, setFilteredUsers })(UsersTableComponent);
