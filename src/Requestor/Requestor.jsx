import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import "./Requestor.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import Button from '@mui/material/Button';
import { useData } from '../Context/Context';
import axios from 'axios';
import TemporaryDrawer from '../TemporaryDrawer/TemporaryDrawer';

function Requestor() {
    const [env, setEnv] = React.useState('production');
    const [logging, setLogging] = React.useState('');
    const [domain, setDomain] = React.useState('');
    const [allDomain, setAllDomain] = React.useState([]);
    const data = useData();
    const handleChange = async(event) => {
        
       setEnv(event.target.value);
       let qparams = {
        envname : event.target.value,
        orgId : data.data.orgId,
        }
        let secrets = {
            "X-ClientID" : "4bf754c0621642b7b7552dc9eaf4c86e",
            "X-ClientSecret"  : "F1Ca1EdE09e9441FaB8703dAB36cD555"
        }
        let result =  await axios.get("http://cloudhub-sapi.us-e2.cloudhub.io/api/getdomains", {params : qparams, headers : secrets})
        setAllDomain(result.data);
    };
    const handleChange1 = (event) => {
        setLogging(event.target.value);
    }
    const handleChange2 = (event) => {
        setDomain(event.target.value);
    }
    const handlebutton1 = async(e) => {
        console.log(data.data);
        let postData = 
        {
            "access_token" : data.data.access_token,
            "domain" : domain,
            "envName" : env, 
            "loggingActivity" : logging,
            "requestorId" : data.data.userId,
            "orgId" : data.data.orgId,
            "role" : data.data.userType,
            "teamId" : "null",
            "teamName" : "null",
            "actionType" : "Request",
            "userId" : data.data.userId
        };
        console.log(postData)
        try{
            let headers = {
                "X-ClientID" : "bd05b131b0cb41418cecf3a83b1ff630",
                "X-ClientSecret" : "2bc352B526534434aC77eF094E875eCA"
            }
            let postResult =  await axios.post("http://central-papi.us-e2.cloudhub.io/api/request", postData, {headers : headers});
            alert("requestSent");
        }catch(e){
            alert("Failed")
        }
        
    }
  return (

                <div className='main_request_box'>
                    <div className='request_process_box'>
                        <div>
                        <FormControl sx={{ m: 1, minWidth: 1000 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Environment Name</InputLabel>
                            <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={env}
                            onChange={handleChange}
                            margin = "dense"
                            fullWidth
                            label="Environment"
                            >
                            
                            <MenuItem value={"creation"}>Creation</MenuItem>
                            <MenuItem value={"production"}>Production</MenuItem>
                        </Select>
                        </FormControl>
                        </div>
                    <div>
                        <FormControl sx={{ m: 1, minWidth: 1000 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Logging Activity</InputLabel>
                            <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={logging}
                            onChange={handleChange1}
                            margin = "dense"
                            fullWidth
                            label="Logging Activity"
                            >
                            
                            <MenuItem value={"DEBUG"}>Debug</MenuItem>
                            <MenuItem value={"WARN"}>Warn</MenuItem>
                            <MenuItem value={"ERROR"}>Error</MenuItem>
                            <MenuItem value={"INFO"}>Info</MenuItem>
                        </Select>
                        </FormControl>
                        </div>
                        <div>
                        <FormControl sx={{ m: 1, minWidth: 1000 }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Domain</InputLabel>
                            <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={domain}
                            onChange={handleChange2}
                            margin = "dense"
                            fullWidth
                            label="Domain"
                            >
                            {
                                
                                allDomain.map((domain) => {
                                    return(
                                        <MenuItem value = {domain.domain}>{domain.domain}</MenuItem>
                                    )
                                })
                                
                            }
                        </Select>
                        </FormControl>
                    </div>
                    <div>
                        <Stack direction="row" spacing={2} alignContent = "center">
                            <Button variant="contained" color="success" onClick={handlebutton1}>
                                Request
                            </Button>
                        </Stack>
                    </div>
                </div>
                <div className='nav_menu'>
                    <TemporaryDrawer></TemporaryDrawer>
                </div>
                
    </div>
  )
}



export default Requestor