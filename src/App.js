import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Login from './login/Login.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login"  element = {<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
