import React from 'react';
import { FormControl, InputLabel, Input, FormHelperText, Select, MenuItem, TextField, Button} from '@mui/material';
import axios from 'axios';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import  uniqid from 'uniqid';
import "./Viewer.css"
import ExportCSV from './ExportCSV';


const Viewer = () => {
    var uniqid = require('uniqid')

    const [sort, setSort] = React.useState('');
    const [filter, setfilter] = React.useState('');
    const [reqId, setReqId] = React.useState('');
    const [page, setPagination] = React.useState('');
    const [offset, setOffSet] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const columns: GridColDef[] = [
        { field: 'A_DID', headerName: 'Approver/DenierID', width: 70 },
        { field: 'DEPLOYMENTID', headerName: 'DeploymentId', width: 130 },
        { field: 'ENVID', headerName: 'EnvironmentId', width: 130 },
        { field: 'ENVNAME', headerName: 'EnvironmentName', width: 130 },
        { field: 'ENVTYPE', headerName: 'EnvironmentType', width: 130 },
        { field: 'LOGGINGACTIVITY', headerName: 'LoggingActivity', width: 130 },
        { field: 'ORGID', headerName: 'OrganizationId', width: 130 },
        { field: 'REQID', headerName: 'RequestorId', width: 130 },
        { field: 'REQSTATUS', headerName: 'RequestorStatus', width: 130 },
        { field: 'REQUESTORID', headerName: 'EnvironmentId', width: 130 },
        { field: 'TEAMID', headerName: 'EnvironmentId', width: 130 },
        { field: 'TEAMNAME', headerName: 'EnvironmentId', width: 130 },
        { field: 'USERTYPE', headerName: 'EnvironmentId', width: 130 },
      ];
    
    const handleChange = (event) => {
        setSort(event.target.value);
    };
    const handleChange1 = (e) =>{
        setReqId(e.target.value);
    }
    const handleButton = async (e) => {
        let headers = {
            "X-ClientID" : "d7fb6dec0a2840909ce77bfd470d99e6",
            "X-ClientSecret" : "56caF39350Fa46e4Abc52305c5489265"
          }
        let params = {"direction" : sort, "Sort" : reqId,  "limit" : page, "offset" : offset};
        let data = await axios.get("http://audit-api.us-e2.cloudhub.io/api/audit", {params, headers:headers})
        console.log(data.data);
        setRows(data.data);
    }
    return (
        <div>
            
            
            <div className='viewer_input'>
            <FormControl sx={{ m: 1, minWidth: 800 }} >
                    <InputLabel id="demo-simple-select-label">Sorting</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sort}
                        label="Enter Sorting Criteria"
                        onChange={handleChange}
                    >
                       
                        <MenuItem value="asc">Increasing Order</MenuItem>
                        <MenuItem value="desc">Decreasing Order</MenuItem>
                    </Select>
            </FormControl >
            <FormControl sx={{ m: 1, minWidth: 800 }} >
                    <InputLabel id="demo-simple-select-label">filter</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={reqId}
                        label="Requestor Id"
                        onChange={handleChange1}
                    >
                        <MenuItem value="reqId">Requestor Id</MenuItem>
                    </Select>
            </FormControl >
                <div>
                    <TextField sx={{ m: 1, minWidth: 800 }} id="outlined-basic" onChange={(e) => {setPagination(e.target.value)}} label= "Pagination" variant="outlined" />
                </div>
                <div>
                    <TextField sx={{ m: 1, minWidth: 800 }} id="outlined-basic" onChange={(e) => {setOffSet(e.target.value)}} label= "OffSet" variant="outlined" />
                </div>
                <div>
                    <Button variant="contained" onClick={handleButton}>GetAudit</Button>
                    <ExportCSV csvData={rows} fileName = {"audit"}></ExportCSV>
                </div>
                <div>
                    
                </div>

            </div>
            <div>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                <TableRow>
                                    <TableCell align="right">EnvironmentName</TableCell>
                                    <TableCell align="right">EnvironmentTYPEName</TableCell>
                                    <TableCell align="right">LoggingActivity</TableCell>
                                    <TableCell align="right">RequestId</TableCell>
                                    <TableCell align="right">RequestStatus</TableCell>
                                    <TableCell align="right">teamName</TableCell>
                                    <TableCell align="right">userType</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    {/* <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell> */}
                                    {/* <TableCell align="right">{row.A_DID}</TableCell>
                                    <TableCell align="right">{row.DEPLOYMENTID}</TableCell> */}
                                    {/* <TableCell align="right">{row.ENVID}</TableCell> */}
                                    <TableCell align="right">{row.ENVNAME}</TableCell>
                                    <TableCell align="right">{row.ENVTYPE}</TableCell>
                                    <TableCell align="right">{row.LOGGINGACTIVITY}</TableCell>
                                    {/* <TableCell align="right">{row.ORGID}</TableCell> */}
                                    <TableCell align="right">{row.REQID}</TableCell>
                                    <TableCell align="right">{row.REQSTATUS}</TableCell>
                                    {/* <TableCell align="right">{row.REQUESTORID}</TableCell>
                                    <TableCell align="right">{row.TEAMID}</TableCell> */}
                                    <TableCell align="right">{row.TEAMNAME}</TableCell>
                                    <TableCell align="right">{row.USERTYPE}</TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </TableContainer> 
                </div>
                
        </div>
    );
};

export default Viewer;