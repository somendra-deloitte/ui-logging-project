import React, { useContext } from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

const Context = React.createContext();

export function useData() {
    return useContext(Context);
}
export function ContextProvider({children}) {
    const [data, setData]=React.useState(null);
    const [userCridentials, setCridentials] = React.useState({})
    let navigate = useNavigate();
    const login = async(name ,password)=> {
        // let headers = {
        //     "X-ClientID" : "e5d638193a074025a5249b0573ac0b75",
        //     "X-ClientSecret" : "25042fa5aa474F2AA8EC770151e2E3Ad"
        //     }
        let userdetails = {"username" : name, "password" : password}
        setCridentials(userdetails)
        let data = await axios.post( "http://login-papi.us-e2.cloudhub.io/api/login",  {
            username: name, 
            password: password
          }, {headers : {
            "X-ClientID" : "e5d638193a074025a5249b0573ac0b75",
            "X-ClientSecret" : "25042fa5aa474F2AA8EC770151e2E3Ad"
            }})
        
        if(data.data.status === true){
            console.log(data.data);
            setData(data.data)
            let userGroup = data.data.userGroup;
            navigate(`/${userGroup}`);
        }else{
            console.log(data.data);
            console.log("not authorize");
        }
    }

    const value = {
        login,
        data,
        userCridentials
    }

    return (
        <Context.Provider value={value}>
           { children }
        </Context.Provider>
    )
}