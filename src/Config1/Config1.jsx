import React, {useState, useEffect} from 'react';
import { useData } from '../Context/Context';
import { BrowserRouter as Router, Switch, Route, useNavigate} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';



function Config1(props) {
    const [userName, setUserName] = useState("");
    const [userPass, setUserPass] = useState("");
    const d = useData();
    const naviagate = useNavigate();
    useEffect(async() => {
        let headers = {
            "X-ClientID" : "cee7adb8c10f421abdeef6cc08aed4d5",
            "X-ClientSecret" : "25042fa5aa474F2AA8EC770151e2E3Ad"
        }
        let x = await axios.get("http://db-sapi.us-e2.cloudhub.io/db/api/getcredentials", {headers});
        console.log(x); 
        if(x.data.length > 0){
            naviagate("/login")
        }
    })
    const handleLogin = async () => {
        let headers = {
            "X-ClientID" : "c295dcf04c59476a8ac6350146a41ec5",
            "X-ClientSecret" : "93b75b5F69D54857915371592a797932"
        }
        let body = {"username" : userName, "password" : userPass};
        let data = await axios.post("http://config-papi.us-e2.cloudhub.io/api/login", body, {headers});
        alert(data.data.status);
    }
    return (
     <div className='login_main_container'>
         
         <div className='login_main_container_1'>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                className='main_box_class'
                >
                <div>
                    <TextField sx={{ m: 1, minWidth: 500 }} id="outlined-basic" onChange={(e) => {setUserName(e.target.value)}} label= "UserName" variant="outlined" />
                </div>
                <div>
                    <TextField sx={{ m: 1, minWidth: 500 }} id="outlined-basic" onChange={(e) => {setUserPass(e.target.value)}} label= "Password" variant="outlined" type = "password" />
                </div>
                <div>
                    <Button variant="contained" onClick={handleLogin}>Login</Button>
                </div>  
            </Box>
        </div>
        
    </div>
    );
}

export default Config1;