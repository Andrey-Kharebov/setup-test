import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import logger from 'redux-logger';
import usersReducer from './reducers/users-reducer';
import { reducer as formReducer } from 'redux-form';

const middlewares = [thunkMiddleware];
// const middlewares = [thunkMiddleware, logger];

const reducers = combineReducers({
  usersReducer,
  form: formReducer
});

const store = createStore(reducers, applyMiddleware(...middlewares));

window.store = store;
export default store;