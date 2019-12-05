import React, {Component} from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import Display from "./Display";
import HomePage from "./HomePage";
import Secret from '../auth/Secret'
import verifyToken from '../auth/verifyToken'
import LoginPage from '../auth/LoginPage'
import RegisterPage from '../auth/RegisterPage'
import PrivateRoute from '../auth/PrivateRoute'
class App extends Component {
  
  render(){
    return(
      
    <BrowserRouter>
    <Switch>
      {/* <Route exact path="/" component={LoginPage} /> */}
      <Route path="/login" component={LoginPage} />
      <Route path="/secret" component={verifyToken(Secret)} />
      <Route path='/register' component={RegisterPage} />
      <PrivateRoute exact path='/' component={HomePage} />
      <PrivateRoute exact path='/display' component={Display} />
    </Switch>
  </BrowserRouter>
    )
  }
}

export default App;
