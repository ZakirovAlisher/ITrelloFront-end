import React, { useState, useEffect, useContext} from 'react';
import {useCookies} from 'react-cookie';
import { scryRenderedDOMComponentsWithTag } from 'react-dom/test-utils';

 
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Redirect
  } from "react-router-dom";



function Login(){

    const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

   
    const [signed, setSigned] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const handleEmailChange = event =>{
        setEmail(event.target.value);
    }

    const handlePasswordChange = event =>{
        setPassword(event.target.value);
    }

    const handleSubmit = event =>{
        const inputData = {email, password};
        auth(inputData);
        event.preventDefault();
    }

    async function auth(data){
        
        const response = await fetch("http://localhost:8000/auth", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
          });

        if(response.status==200){
            let jwt = await response.json();
            setCookieJWT('jwt', jwt);
            setSigned(true);
        }else{
                setMsg("INCORRECT");

        }

    }

    async function test(){   
             
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/profile", {
            method:'GET',
            headers: {
              "Content-Type": "application/json",
              "Authorization": bearer
            }
        });

        if(response.status==200){
            let res = await response.json();
            console.log(res);
        }    
    }
    if(signed==false){
    return (
        <div className = "container">
          <h1 className="text-danger"> {msg} </h1> <br/>
            <div className = "row mt-3">
                <div className = "col-6 mx-auto">
                    <form onSubmit = {handleSubmit}>
                        <div className = "form-group">
                            <label>
                                Email : 
                            </label>
                            <input type = "email" className = "form-control" value = {email} onChange = {handleEmailChange}/>
                        </div>
                        <div className = "form-group">
                            <label>
                                Password : 
                            </label>
                            <input type = "password" className = "form-control" value = {password} onChange = {handlePasswordChange}/>
                        </div>
                        <div className = "form-group">
                            <button className = "btn btn-success" >SIGN IN</button>
                        </div>
                        <div className = "form-group">
                            <button className = "btn btn-danger" type = "button" onClick={test}>TEST</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )}else{
        return <Redirect to="/profile" />
    }
}

export default Login;