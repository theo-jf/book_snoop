import { combineReducers } from 'redux';

// Import reducers below
import errors from './errors.reducer';
import user from './user.reducer';
import searchResults from './searchResults.reducer';
import editionsResults from './editionsResults.reducer';
import addresses from './addresses.reducer';
import profileReducers from './profile.reducer';
import queryFromHome from './queryFromHome.reducer';
import currentAuthor from './currentAuthor.reducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  searchResults,
  editionsResults,
  addresses,
  profileReducers,
  queryFromHome,
  currentAuthor
});

export default rootReducer;