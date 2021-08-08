import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Registration from './Component/Registration/Registration';
import Welcome from './Component/WelcomeScreen/Welcome';
import EmployeeLists from './Component/EmployeeList/EmployeeList'
import AddEmployees from './Component/EmployeeList/AddEmployees';

function App() {
  return (
    <div className="App">
      <Router baseName="/">
        <Switch>
          <Route exact path='/' component={Registration} />
          <Route exact path='/welcome-user' component={Welcome} />
          <Route exact path='/employee-lists' component={EmployeeLists} />
          <Route exact path='/employee-add/:employee_id?' component={AddEmployees} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

