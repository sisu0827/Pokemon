import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import useToken from './useToken';

function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

          // <Route path="/">
          //   <Dashboard />
          // </Route>
          // <Route path="/dashboard">
          //   <Dashboard />
          // </Route>
  return (
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Dashboard}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;