import React from 'react';
import { connect } from 'react-redux';
import { addUser, setFormMode } from '../../redux/reducers/users-reducer';
import classes from './NewUserComponent.module.css';
import UserReduxForm from './UserForm/UserForm';

function NewUserComponent({ formMode, setFormMode, addUser }) {

  const onSubmit = (formData) => {
    setFormMode(false);
    addUser(formData);
  }

  return (
    <div className={ classes.newUserComponent} >
      { formMode 
        ? <UserReduxForm onSubmit={ onSubmit } />
        : null }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    formMode: state.usersReducer.formMode,
  }
}

export default connect(mapStateToProps, { addUser, setFormMode })(NewUserComponent);
