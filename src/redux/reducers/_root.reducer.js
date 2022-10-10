import { combineReducers } from 'redux';

// Import reducers below
import errors from './errors.reducer';
import user from './user.reducer';
import searchResults from './searchResults.reducer';
import editionsResults from './editionsResults.reducer';
import addresses from './addresses.reducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  searchResults,
  editionsResults,
  addresses
});

export default rootReducer;