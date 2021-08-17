import './App.css';
import Header from './header';
import Sidebar from './sidebar';
import Chat from './Chat';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import React, { useState } from 'react';
import Login from './login';
import { useStateValue } from './stateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();
  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <div className="appBody">
              <Sidebar />
              <Switch>
                <Route path="/room/:roomId">
                  <Chat />
                </Route>
                <Route path="/">
                  <div className="welcomeTag">
                    <img src='../favicon.ico' />
                    <h1>Welcome to weConnect.com</h1>
                  </div>
                </Route>
              </Switch>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;