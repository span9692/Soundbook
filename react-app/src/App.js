import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import Splash from './components/SplashPage/splash';
import Profile from './components/Profile';
import Feed from './components/Feed';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [searchParams, setSearchParams] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>

      <Switch>
        <Route path='/' exact={true}>
          <Splash />
        </Route>
        <ProtectedRoute path='/feed' exact={true}>
          <NavBar searchParams={searchParams} setSearchParams={setSearchParams}/>
          <Feed setSearchParams={setSearchParams}/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <NavBar searchParams={searchParams} setSearchParams={setSearchParams}/>
          <Profile setSearchParams={setSearchParams}/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
