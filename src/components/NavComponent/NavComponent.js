import React from 'react';
import { connect } from 'react-redux';
import { setFilteredUsers, setFormMode, setSearchQuery } from '../../redux/reducers/users-reducer';
import classes from './NavComponent.module.css';

function NavComponent({ formMode, setFormMode, searchQuery, setSearchQuery, setFilteredUsers }) {
  const formModeActivator = () => {
    setFormMode(true);
  }

  const searchHandler = (event) => {
    setSearchQuery(event.target.value);
    setFilteredUsers(event.target.value);
  }
  
  return (
    <div className={ classes.navComponent }>
      <nav>
        <div className="nav-wrapper">
          <div>
            <button className="btn" onClick={ () => { formModeActivator() }} disabled={ !!formMode } >Add User</button>
          </div>
          <div className="input-field" style={{ maxWidth: '350px', width: '100%' }}>
            <input id="search" type="search" required onChange={ (event) => { searchHandler(event) }} value={ searchQuery } />
            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
            <i className="material-icons">close</i>
          </div>
        </div>
      </nav>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    searchQuery: state.usersReducer.searchQuery,
    formMode: state.usersReducer.formMode
  }
}

export default connect(mapStateToProps, { setFormMode, setSearchQuery, setFilteredUsers })(NavComponent);

