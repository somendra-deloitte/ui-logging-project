import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

function Login(props) {
    const [userName, setUserName] = useState("");
    const [userPass, setUserPass] = useState("");
    let navigate = useNavigate()
    const handleLogin = async () => {
        console.log(userName);
        console.log(userPass);
        let data = axios(
            {
                method: 'post',
                url: "http://localhost:8081/api/login",
                headers: {}, 
                data: {
                  username: userName, // This is the body part
                  password: userPass
                }
              }
        )
        if(data.status === true){
            console.log(data);
        }else{
            console.log(data.status);
        }

    }
    return (
     <>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
            <TextField id="outlined-basic" onChange={(e) => {setUserName(e.target.value)}} label= "UserName" variant="outlined" />
            <TextField id="outlined-basic" onChange={(e) => {setUserPass(e.target.value)}} label= "Password" variant="outlined" />
            <Button variant="contained" onClick={handleLogin}>Contained</Button>

            
        </Box>
        
    </>
    );
}

export default Login;