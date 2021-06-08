import React from 'react'
import NavBar from './components/NavBar/NavBar'
import Schedule from './components/Schedule/Schedule'
import AdminApp from './components/Admin/Admin'
import {
  Switch,
  Route
} from 'react-router-dom'

function App() {
  return (
    <Switch>
        <Route path="/schedule">
          <NavBar />
          <Schedule />
        </Route>
        <Route path="/login">
          <AdminApp />
        </Route>
        <Route path="/">
          <NavBar />
        </Route>
    </Switch>
  );
}

export default App;
