import * as React from 'react';
import { Paper } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import axios from 'axios';
import { useData } from '../Context/Context';
import { TextField, Button } from '@mui/material';
import "./Admin.css"
export default function Admin() {
  const details = useData();
  const [orgs, setOrgs] = React.useState([]);
  const [orgId, setOrgId] = React.useState('');
  const [envName, setEnvName] = React.useState('');
  const [envType, setEnvType] = React.useState('');
  const handleOrg = async() =>{
      let qParams = {"orgName" : orgName};
      let data = await axios.get("http://config-papi.us-e2.cloudhub.io/api/configurebg", {params : qParams, headers : {"X-ClientID" : "c295dcf04c59476a8ac6350146a41ec5", "X-ClientSecret" : "93b75b5F69D54857915371592a797932"}});
      alert(data);
      console.log(data);
  }
  const [orgName, setOrgName] = React.useState('');
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }));
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
      console.log(event.target.value);
    setOrgId(event.target.value);
  };
  const handleEnv = async() => {
    let qParams = {"orgId" : orgId, "envName" : envName, "envType" : envType};
    let data = await axios.get("http://config-papi.us-e2.cloudhub.io/api/configureenv", {params : qParams,headers : {"X-ClientID" : "c295dcf04c59476a8ac6350146a41ec5", "X-ClientSecret" : "93b75b5F69D54857915371592a797932"}}
    );
    console.log(data.data);
    alert(data.data.status);
  }
  const handleEnvType = (e) => {
    setEnvType(e.target.value);
  }
  React.useEffect(async() => {
    let body = {"access_token" : details.data.access_token}
    console.log(details.data.access_token);
    const headers = {
        'Content-Type': 'application/json',
        "access_token" : details.data.access_token,
        "X-ClientID" : "4bf754c0621642b7b7552dc9eaf4c86e",
        "X-ClientSecret" : "F1Ca1EdE09e9441FaB8703dAB36cD555"
      }
      let allOrgs = await axios.get("http://cloudhub-sapi.us-e2.cloudhub.io/api/getorganization", {
          headers: headers
        })
     
    let orgs =  allOrgs.data;
    setOrgs(orgs);
  },[])
  return (
      <>
      <Paper sx={{display:"flex"}}>
      <div className='config-env-main'>
        <p>Enter Environments Details</p>
        <div>
          <FormControl sx={{ m: 1, minWidth: 400, marginBottom:20, marginTop:10 }} variant="standard">
            <TextField sx={{ m: 1, minWidth: 400 }} id="outlined-basic" onChange={(e) => {setEnvName(e.target.value)}} label= "EnvName" variant="outlined" />
            <InputLabel id="demo-customized-select-label">Select Organization</InputLabel>
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                label="Enter Org"
                value={orgId}
                onChange={handleChange}
                input={<BootstrapInput />}
              >
                  {
                      orgs.map((org) => (
                          <MenuItem value={org.orgId}>{org.orgName}</MenuItem>
                      ))
                  }
              </Select>
              <InputLabel id="demo-multiple-name-label">Environment Type</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={envType}
                onChange = {handleEnvType}
              >
                <MenuItem value = {"basic"}>basic</MenuItem>
                <MenuItem value = {"none"}>none</MenuItem>
                <MenuItem value = {"protected"}>protected</MenuItem>
                <MenuItem value = {"restricted"}>restricted</MenuItem>
              </Select>
              <Button variant="contained" onClick = {handleEnv}>Configure Environment</Button>
          </FormControl>
      </div>
      <div>
      <FormControl sx={{ m: 1, minWidth: 400 }} variant="standard">
        {/* <InputLabel id="demo-customized-select-label">Select Organization</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          label="Enter Org"
          value={orgId}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
            {
                orgs.map((org) => (
                    <MenuItem value={org.orgId}>{org.orgName}</MenuItem>
                ))
            }
        </Select> */}
      </FormControl>
      <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        {/* <InputLabel id="demo-multiple-name-label">Environment Type</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          value={envType}
          onChange = {handleEnvType}
        >
          <MenuItem value = {"basic"}>basic</MenuItem>
          <MenuItem value = {"none"}>none</MenuItem>
          <MenuItem value = {"protected"}>protected</MenuItem>
          <MenuItem value = {"restricted"}>restricted</MenuItem>
        </Select> */}
      </FormControl>
    </div>
      
      </div>
      
      <div>
          {/* <Button variant="contained" onClick = {handleEnv}>Configure Environment</Button> */}
      </div>
    </div>
    </Paper>
    <Paper>
        <div className='config-org-main'>
            {/* <p>Enter Organization Details</p> */}
            <div>
             
              <FormControl sx={{ m: 1 }} variant="standard">
               <p>Enter Organization Details</p>
                <TextField sx={{ m: 1, minWidth: 500 }} id="outlined-basic" onChange={(e) => {setOrgName(e.target.value)}} label= "Organization Name" variant="outlined" />
                <Button variant="contained" onClick = {handleOrg}>Configure Organization</Button>
              </FormControl>
          </div>
              {/* <Button variant="contained" onClick = {handleOrg}>Configure Organization</Button> */}
        </div>
    </Paper>
  </>
  )
}
