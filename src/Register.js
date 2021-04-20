import React, { useState } from 'react';
import {useCookies} from 'react-cookie';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Redirect
  } from "react-router-dom";

function Register(){
     
    const [logged, setLogged] = useState(false);

    const[email, setEmail] = useState("");
    const[fullName, setFullName] = useState("");
    const[password, setPassword] = useState("");
    const[rePassword, setRePassword] = useState("");

    const handleEmailChange = event =>{
        setEmail(event.target.value);
    }

    const handleFullNameChange = event =>{
        setFullName(event.target.value);
    }

    const handlePasswordChange = event =>{
        setPassword(event.target.value);
    }

    const handleRePasswordChange = event =>{
        setRePassword(event.target.value);
    }

    const handleSubmit = event =>{
        if(password == rePassword){
            const inputData = {email, fullName, password};
            register(inputData);
        }
        else{
            alert("Password is not confirmed!");
        }
        event.preventDefault();
    }

    async function register(data){
        const response = await fetch("http://localhost:8000/api/register", {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type" : "application/json"
          },
          redirect: "follow",
          referrerPolicy: "no-referrer", 
          body: JSON.stringify(data)
        });
    
        if(response.status==200){
            let jwt = await response.json();
           
            setLogged(true);
        }
      }
    if(logged==false){
        return(
            <div class="row justify-content-center">
                <div className="col-4" style={{paddingTop: 20}}>
                    <h1>Registration</h1><br />
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" value={email} onChange={handleEmailChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputFullName1">Full name</label>
                            <input type="text" value={fullName} onChange={handleFullNameChange} className="form-control" id="exampleInputFullName1"  placeholder="Enter full name" />
                        </div>
                        <div class="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" value={password} onChange={handlePasswordChange} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <div class="form-group">
                            <label htmlFor="exampleInputRePassword1">Re-Password</label>
                            <input type="password" value={rePassword} onChange={handleRePasswordChange} className="form-control" id="exampleInputRePassword1" placeholder="Confirm password" />
                        </div>
                       
                        <button type="submit" className="btn btn-success">Sign up</button>
                    </form>
                </div>
            </div>
        )
    }
    else{
        return <Redirect to="/login" />
    }
}

export default Register;