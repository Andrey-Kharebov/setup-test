import React from "react";
import { connect } from "react-redux";
import { setActiveFilter, setFilteredUsers } from "../../redux/reducers/users-reducer";
import classes from "./SortComponent.module.css";

function SortComponent({ setFilteredUsers, setActiveFilter }) {

  const filterByStatus = (event) => {
    setActiveFilter(event.target.value)
    setFilteredUsers(event.target.value);
  };

  return (
    <div className={classes.sortComponent}>
      <h6>Status filter:</h6>
      <div className={classes.selectors}>
        <label>
          <input onChange={(event) => { filterByStatus(event) }} name="status" value="all" type="radio" />
          <span>All</span>
        </label>
        <label>
          <input onChange={(event) => { filterByStatus(event) }} name="status" value="client" type="radio" />
          <span>Clients</span>
        </label>
        <label>
          <input onChange={(event) => { filterByStatus(event) }} name="status" value="partner" type="radio" />
          <span>Partners</span>
        </label>
        <label >
          <input onChange={(event) => { filterByStatus(event) }} name="status" value="admin" type="radio" />
          <span>Administrators</span>
        </label>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, { setActiveFilter, setFilteredUsers })(SortComponent);


