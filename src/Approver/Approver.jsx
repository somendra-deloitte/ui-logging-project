import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { useEffect, UseState } from 'react';
import axios from 'axios';
import { useData } from '../Context/Context';
import TemporaryDrawer from '../TemporaryDrawer/TemporaryDrawer';

const columns = [
  { id: 'REQID', label: 'RequestID', minWidth: 170 },
  { id: 'ENVNAME', label: 'Environment Name', minWidth: 170 },
  { id: 'DOMAIN', label: 'Domain Name', minWidth: 100 },
  {
    id: 'LOGGINGACTIVITY',
    label: 'Logging Activity',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'USERTYPE',
    label: 'User Type',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  }
  
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

export default function Approver() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let [rows, setRows] = React.useState([]);
  const data = useData();
  useEffect(async() => {
    let headers = {
      "X-ClientID" : "cee7adb8c10f421abdeef6cc08aed4d5",
      "X-ClientSecret" : "38B4B311800F45F5B2035507BE4b4760"
    }
    let data = await axios.get("http://db-sapi.us-e2.cloudhub.io/db/api/pendingreq", {headers : headers});
    console.log(data.data);
    setRows(data.data);
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleApprove = async(row) => {
    let postData = {
        "A_DID" : row.A_DID,
        "ENVNAME" : row.ENVNAME,
        "USERTYPE" : row.USERTYPE,
        "ENVID" : row.ENVID,
        "ORGID" : row.ORGID,
        "REQID" : row.REQID,
        "LOGGINGACTIVITY" : row.LOGGINGACTIVITY,
        "REQUESTORID" : row.REQUESTORID,
        "DEPLOYMENTID" : row.DEPLOYMENTID,
        "TEAMID" : row.TEAMID,
        "DOMAIN" : row.DOMAIN,
        "ENVTYPE" : row.ENVTYPE,
        "TEAMNAME" : row.TEAMNAME,
        "ACTIONTYPE" : "Approve",
        "ACCESSTOKEN" : data.data.access_token,
        "USERTYPEAPPROVER" : data.data.userType,
        "USERID" : data.data.userId,
    }
    try{
        let headers = {
          "X-ClientID" : "bd05b131b0cb41418cecf3a83b1ff630",
          "X-ClientSecret" : "2bc352B526534434aC77eF094E875eCA"
        }
        let postResult = await axios.post("http://central-papi.us-e2.cloudhub.io/api/approve", postData, {headers : headers});
        console.log(postResult.data);
        alert("Request Approved");
    }catch(e){
        alert("Failed : Review your action")
    }
  }
  const handleDecline = async(row) => {
    let postData = {
        "A_DID" : row.A_DID,
        "ENVNAME" : row.ENVNAME,
        "USERTYPE" : row.USERTYPE,
        "ENVID" : row.ENVID,
        "ORGID" : row.ORGID,
        "REQID" : row.REQID,
        "LOGGINGACTIVITY" : row.LOGGINGACTIVITY,
        "REQUESTORID" : row.REQUESTORID,
        "DEPLOYMENTID" : row.DEPLOYMENTID,
        "TEAMID" : row.TEAMID,
        "DOMAIN" : row.DOMAIN,
        "ENVTYPE" : row.ENVTYPE,
        "TEAMNAME" : row.TEAMNAME,
        "ACTIONTYPE" : "Deny",
        "ACCESSTOKEN" : data.data.access_token,
        "USERTYPEAPPROVER" : data.data.userType,
        "USERID" : data.data.userId,
    }
    console.log(postData);
    try{
        let headers = {
          "X-ClientID" : "bd05b131b0cb41418cecf3a83b1ff630",
          "X-ClientSecret" : "2bc352B526534434aC77eF094E875eCA"
        }
        let postResult = await axios.post("http://central-papi.us-e2.cloudhub.io/api/approve", postData, {headers: headers});
        console.log(postResult.data);
        alert("Request Denied");
    }catch(e){
        alert("Failed : Review your action")
    }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TemporaryDrawer></TemporaryDrawer>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                    <Button varient="filled" sx={{color:"green"}} onClick ={()=>{handleApprove(row)}}>Approve</Button>
                    <Button varient="filled" sx={{color:"red"}}   onClick ={()=>{handleDecline(row)}}>decline</Button>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
