import React, {Component} from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Display from "./Display";
import HomePage from "./HomePage";
import Secret from '../auth/Secret'
import verifyToken from '../auth/verifyToken'
import LoginPage from '../auth/LoginPage'
import RegisterPage from '../auth/RegisterPage'

class Router extends Component {
  render(){
    return(
      
    <BrowserRouter>
    <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/secret">Secret</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/secret" component={verifyToken(Secret)} />
      <Route path="/login" component={LoginPage} />

      <Route path="/display" component={Display} />
      <Route path='/register' component={RegisterPage} />
    </Switch>
  </BrowserRouter>
    )
  }
}

export default Router;

// import React, { Component } from 'react';
// import { Link, Route, Switch } from 'react-router-dom';
// import withAuth from './withAuth';
// import Home from './Home';
// import Secret from './Secret';
// import Login from './Login';
// import LoginPage from "./LoginPage";

// class App extends Component {
//   render() {
//     return (
//       <div>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/secret">Secret</Link></li>
//           <li><Link to="/login">Login</Link></li>
//         </ul>

//         <Switch>
//           <Route path="/" exact component={Home} />
//           <Route path="/secret" component={withAuth(Secret)} />
//           <Route path="/login" component={Login} />
//         </Switch>
//       </div>
//     );
//   }
// }

// export default App;