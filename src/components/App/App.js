// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Route, Switch, useLocation, Redirect,
} from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from 'src/utils/ScrollToTop';

// == Import
import './app.scss';
import Header from 'src/components/Header/Header';
import HomePage from 'src/components/HomePage/HomePage';
import DumpDetails from 'src/containers/DumpDetails/DumpDetails';
import DumpForm from 'src/containers/DumpDetails/DumpForm';
import Error from 'src/components/Error/Error';
import Footer from 'src/components/Footer/Footer';
import Login from 'src/containers/Login/Login';
import Team from 'src/components/Team/Team';
import Questions from 'src/components/Questions/Questions';

// == Composant

const App = ({
  loadDumpsApi,
  formSubmitted,
  resetDumpForm,
  loadStatsApi,
  isLogged,
  saveJWT,
  jwtFromState,
  loadUserData,
  loadEmergencyAndWaste,
}) => {
  useEffect(() => {
    loadEmergencyAndWaste();
  });

  useEffect(() => {
    // loadDumpsApi();
    if (formSubmitted) {
      resetDumpForm();
    }
  }, [formSubmitted]);

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      loadDumpsApi();
      loadStatsApi();
    }
  }, [location]);

  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    // if no token in the state
    if (!jwtFromState) {
      // check the cookie
      const jwtFromCookie = cookies.jwt;
      // if token in the cookie, save it in the state
      if (jwtFromCookie) {
        saveJWT(jwtFromCookie);
      }
    }
    // if token in the state
    else {
      // save it in the cookie
      setCookie('jwt', jwtFromState);
      // load user data
      loadUserData();
    }
  }, [jwtFromState]);

  return (
    <div className="app">
      <ToastContainer />
      <ScrollToTop />
      <Header />
      <div className="main">
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/dump/create" exact>
            {!isLogged && <Redirect to="/login" />}
            <DumpForm />
          </Route>
          <Route path="/dump/edit/:id" exact>
            {!isLogged && <Redirect to="/login" />}
            <DumpForm />
          </Route>
          <Route path="/dumps/:id">
            <DumpDetails />
          </Route>
          <Route path="/team" exact>
            <Team />
          </Route>
          <Route path="/faq" exact>
            <Questions />
          </Route>
          {/* si aucune route n'a matché, la dernière sera prise par le switch */}
          <Route>
            <Error />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

// == Export
export default App;

App.propTypes = {
  loadDumpsApi: PropTypes.func.isRequired,
  loadStatsApi: PropTypes.func.isRequired,
  formSubmitted: PropTypes.bool.isRequired,
  resetDumpForm: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  saveJWT: PropTypes.func.isRequired,
  jwtFromState: PropTypes.string.isRequired,
  loadUserData: PropTypes.func.isRequired,
  loadEmergencyAndWaste: PropTypes.func.isRequired,
};
