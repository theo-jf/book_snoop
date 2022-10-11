import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

// Import components
import SearchPage from '../SearchPage/SearchPage';
import MapInfo from '../MapInfo/MapInfo';
import EditionsList from '../SearchPage/EditionsList';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/home" to="/search" />

          {/* Visiting localhost:3000/about will show the about page. */}
          {/* <Route exact path="/about" */}
            {/* // shows AboutPage at all times (logged in or not) */}
          {/* > */}
            {/* <AboutPage /> */}
          {/* </Route> */}

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          {/* <ProtectedRoute exact path="/user" */}
            {/* // logged in shows UserPage else shows LoginPage */}
          {/* > */}
            {/* <UserPage /> */}
          {/* </ProtectedRoute> */}

          {/* <ProtectedRoute exact path="/info" */}
            {/* // logged in shows InfoPage else shows LoginPage */}
          {/* > */}
            {/* <InfoPage /> */}
          {/* </ProtectedRoute> */}

          {/* <Route exact path="/login"> */}
            {/* {user.id ? */}
              {/* // If the user is already logged in,  */}
              {/* // redirect to the /user page */}
              {/* <Redirect to="/user" /> */}
              {/* : */}
              {/* // Otherwise, show the login page */}
              {/* <LoginPage /> */}
            {/* } */}
          {/* </Route> */}

          {/* <Route exact path="/registration"> */}
            {/* {user.id ? */}
              {/* // If the user is already logged in,  */}
              {/* // redirect them to the /user page */}
              {/* <Redirect to="/user" /> */}
              {/* : */}
              {/* // Otherwise, show the registration page */}
              {/* <RegisterPage /> */}
            {/* } */}
          {/* </Route> */}

          <Route exact path="/home">
            {/* *** Put home search bar here *** */}

          </Route>
          <Route exact path="/search">
            <SearchPage />
          </Route>

          <Route path="/search/editions/:bookNumber">
            {/* Further sort/search functionality within editions?? */}
            <EditionsList />
          </Route>

          <Route exact path="/map">
            <MapInfo />
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
