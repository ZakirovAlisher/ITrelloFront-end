import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
 
import EditItem from './EditItem';
import Items from './Items';
import Navbar from './Navbar';
import Cards from './Cards';
import EditCard from './EditCard';
import GetTasks from './GetTasks';


import Login from './Login';
import Register from './Register';
import Profile from './Profile';

function App() {

  return (
    <div className = "container">
      <Router>
        <Navbar/>

         

        <div className = "row mt-5">
          <div className = "col-12 mx-auto">
              <Switch>
                <Route path = "/login">
                <Login/>
                </Route>
                <Route path = "/register2">
                <Register/>
                </Route>
                <Route path = {`/edititem/:itemId`}>
                  <EditItem/>
                </Route>
               
                <Route path = {`/profile`}>
                  <Profile/>
                </Route>

                <Route path = {"/allcards"}>
                  <Cards/>
                </Route>
                <Route path = {`/gettasks/:itemId`}>
                  <GetTasks/>
                </Route>

                <Route path = {`/getcardedit/:itemId`}>
                  <EditCard/>
                </Route>

 <Route path = "/">
                  <Items/>
                </Route>





              </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
