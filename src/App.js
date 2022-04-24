import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import { ContextProvider } from "./Context/Context";
import './App.css';
import Login from './login/Login.jsx';
import Requestor from "./Requestor/Requestor";
import Header from "./Header/Header";
import Viewer from "./Viewer/Viewer";
import Approver from "./Approver/Approver";
import { useData } from "./Context/Context";
import Config1 from "./Config1/Config1";
import { useEffect } from "react";
import axios from "axios";
import Admin from "./Admin/Admin";
//import { Navigate } from "react-router-dom";


function App() {
  
  
  //const navigate
  return (
    <Router>
      <ContextProvider>
        <Header></Header>
        <Routes>
          <Route exact path="/Viewer" element={<PrivateRoute><Viewer /></PrivateRoute>}></Route>
          <Route exact path="/Requestor" element={<PrivateRoute><Requestor /></PrivateRoute>}></Route>
          <Route exact path="/Approver" element={<PrivateRoute><Approver /></PrivateRoute>}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          
          <Route exact path="/configauth" element={<Config1 />}></Route>
          <Route exact path="/Admin" element={<PrivateRoute><Admin/></PrivateRoute>}></Route>
        </Routes>
      </ContextProvider>
    </Router>
  );
}

function PrivateRoute({ children }) {
  const data = useData();
  console.log(data);
  const [cridentials, setCridentials] = React.useState([1]);
  return (data.data ? children : <Navigate to = "/login"></Navigate>);
}

export default App;
