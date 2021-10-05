import ReactNotification from 'react-notifications-component';
import { useEffect, Suspense, lazy } from 'react';
import 'react-notifications-component/dist/theme.css';
import { Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authOperations, authSelectors } from 'redux/auth';
import Header from 'components/Header';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';

const HomePage = lazy(() => import('../../pages/HomePage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));
const ContactsPage = lazy(() => import('../../pages/ContactsPage'));

const App = () => {
  const dispatch = useDispatch();
  const isGetCurrentUser = useSelector(authSelectors.getIsGetCurrentUser);

  useEffect(() => dispatch(authOperations.getCurrentUser()), [dispatch]);

  return (
    <>
      {!isGetCurrentUser && (
        <>
          <ReactNotification />
          <Header />
          <Switch>
            <Suspense fallback={<p>Load...</p>}>
              <PublicRoute exact path="/">
                <HomePage />
              </PublicRoute>

              <PublicRoute
                exact
                path="/register"
                redirectedTo="/contacts"
                restricted
              >
                <RegisterPage />
              </PublicRoute>

              <PublicRoute path="/login" redirectedTo="/contacts" restricted>
                <LoginPage />
              </PublicRoute>

              <PrivateRoute path="/contacts" redirectedTo="/login">
                <ContactsPage />
              </PrivateRoute>
            </Suspense>
          </Switch>
        </>
      )}
    </>
  );
};

export default App;
