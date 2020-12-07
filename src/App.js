import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App';
import { fetchUsers } from './redux/reducers/users-reducer';
import NavComponent from './components/NavComponent/NavComponent';
import NewUserComponent from './components/NewUserComponent/NewUserComponent';
import SortComponent from './components/SortComponent/SortComponent';
import UsersTableComponent from './components/UsersTableComponent/UsersTableComponent';

function App({ users, fetchUsers }) {
  
  useEffect(() => {
    fetchUsers();
  }, [])

  if (!users) {
    return <div className="container"><p>Loading...</p></div>
  }

  return ( 
    <>
    <NavComponent />
    <div className="container">
      <NewUserComponent />
      <SortComponent />
      <UsersTableComponent />
    </div>  
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.usersReducer.users
  }
}

export default connect(mapStateToProps, { fetchUsers })(App);

