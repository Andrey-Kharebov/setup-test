import Axios from "axios";
import addItemToLs from "../../helpers/addItemToLs";
import properingPhone from "../../helpers/properingPhone";
import removeItemInLs from "../../helpers/removeItemInLs";
import updateItemInLs from "../../helpers/updateItemInLs";

const SET_USERS = 'SET-USERS';
const ADD_USER = 'ADD_USER';
const UPDATE_USER = 'UPDATE-USER';
const REMOVE_USER = 'REMOVE-USER';
const SET_ACTIVE_FILTER = 'SET_ACTIVE_FILTER';
const SET_SEARCH_QUERY = 'SET-SEARCH-QUERY';
const SET_FORM_MODE = 'SET-FORM-MODE';
const SET_FILTERED_USERS = 'SET-FILTERED-USERS';

const initialState = {
  users: null,
  activeFilter: null,
  searchQuery: '',
  formMode: false,
  filteredUsers: null
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS: 
      return {
        ...state,
        users: action.payload,
        isReady: true
      }
    case ADD_USER: {
      let last_user = state.users[state.users.length - 1];
      
      let date = new Date(); 
      let now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
      date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()); // console.log(new Date(now_utc)) => console.log(new Date(now_utc)) 
      let dateWithoutGMT = new Date(now_utc).toString();
      dateWithoutGMT = dateWithoutGMT.split(' ').splice(0, 5).join(' ');
      action.payload.created_at = dateWithoutGMT;
      action.payload.updated_at = dateWithoutGMT;

      action.payload.id = last_user.id;
      ++action.payload.id;

      action.payload.phone = properingPhone(action.payload.phone);

      addItemToLs('users', action.payload);

      return {
        ...state,
        users: [...state.users, action.payload],
        activeFilter: null,
        searchQuery: '',
        filteredUsers: null
      }
    }
    case UPDATE_USER:
      updateItemInLs('users', action.payload);
      console.log(typeof(state.users[0].phone));
      return {
        ...state,
        users: state.users.map(user => {
          if (user.id === action.payload.id) {
            return action.payload;
          } else {
            return user;
          }
        }),
        activeFilter: null,
        searchQuery: '',
        filteredUsers: null
      }
    case SET_ACTIVE_FILTER: 
      return {
        ...state,
        activeFilter: action.payload,
        searchQuery: ''
      }
    case SET_SEARCH_QUERY: 
      return {
        ...state,
        searchQuery: action.payload
      }
    case SET_FORM_MODE: 
      return {
        ...state,
        formMode: action.payload
      }
    case SET_FILTERED_USERS: 
      if ( state.activeFilter === 'all' ) {
        return {
          ...state,
          filteredUsers: state.users,
          activeFilter: null
        }
      } else if ( state.activeFilter === 'client' || state.activeFilter === 'partner' || state.activeFilter === 'admin') {
        return {
          ...state,
          filteredUsers: state.users.filter(user => user.status === action.payload)
        }
      } else {
        let users = state.users.filter(
          i => 
            i.email.toLowerCase().indexOf(action.payload.toLowerCase()) >= 0 ||
            i.phone.indexOf(action.payload.toLowerCase()) >= 0
        )

        if (state.activeFilter) {
          users = users.filter(user => user.status === state.activeFilter);
        }
        
        return {
          ...state,
          filteredUsers: users
        }
      }
    case REMOVE_USER:
      removeItemInLs('users', action.payload);
      
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload.id),
        activeFilter: null,
        searchQuery: '',
        filteredUsers: null
      }
    default: 
      return state;
  }
};

export const setUsers = (payload) => ({ type: SET_USERS, payload });
export const addUser = (payload) => ({ type: ADD_USER, payload });
export const updateUser = (payload) => ({ type: UPDATE_USER, payload });
export const removeUser = (payload) => ({ type: REMOVE_USER, payload });
export const setActiveFilter = (payload) => ({ type: SET_ACTIVE_FILTER, payload });
export const setSearchQuery = (payload) => ({ type: SET_SEARCH_QUERY, payload });
export const setFormMode = (payload) => ({ type: SET_FORM_MODE, payload });
export const setFilteredUsers = (payload) => ({ type: SET_FILTERED_USERS, payload });


export const fetchUsers = () => (dispatch) => {
  if (JSON.parse(localStorage.getItem('users'))) {
    dispatch(setUsers(JSON.parse(localStorage.getItem('users'))))
  } else {
    Axios.get('/users.json')
    .then(response => {
      dispatch(setUsers(response.data))
      localStorage.setItem('users', JSON.stringify(response.data));
    })
  }
}


export default usersReducer;
