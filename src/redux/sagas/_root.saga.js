import { all } from 'redux-saga/effects';

// Import saga function below
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import searchSaga from './search.saga';
import editionsSaga from './editions.saga';
import addressesSaga from './addresses.saga';
import profileSaga from './profile.saga';
import feedSaga from './feed.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    searchSaga(),
    editionsSaga(),
    addressesSaga(),
    profileSaga(),
    feedSaga()
  ]);
}
