import './App.css';
import About from './component/About';
import Home from './component/Home';
import Navbar from './component/Navbar';
import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';
import Login from './component/Login';
import Signup from './component/Signup';
import { useState } from 'react';
import ResetPassword from './component/ResetPassword';
import ForgetPassword from './component/ForgetPassword';


function App() {
const [alert, setAlert]=useState(null)

const showAlert = (message, type)=>{
  setAlert({
    msg : message,
    type: type
  })
  setTimeout(() => {
    setAlert(null);
  }, 1500);
}

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container"> 
            <Switch>
              <Route exact path="/">
                <Home showAlert={showAlert}/>
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login showAlert={showAlert}/>
              </Route>
              <Route exact path="/forget-password">
                <ForgetPassword showAlert={showAlert}/>
              </Route>
              <Route exact path="/reset-password/:id/:token">
                <ResetPassword showAlert={showAlert}/>
              </Route>
              <Route exact path="/signup">
                <Signup showAlert={showAlert}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
