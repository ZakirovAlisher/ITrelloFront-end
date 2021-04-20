import React, { useState, useEffect, useContext} from 'react';
import {useCookies} from 'react-cookie';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";



function Profile(){

    const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
    const [data, setData] = useState([]);
    const [msg, setMsg] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [msg2, setMsg2] = useState("");

    const [old, setOld] = useState("");
    const [neww, setNeww] = useState("");
    const [renew, setRenew] = useState("");


    const [roles, setRoles] = useState([]);

    const handleEmailChange = event =>{
        setEmail(event.target.value);
    }

    const handleNameChange = event =>{
        setFullName(event.target.value);
    }

    const handleNewChange = event =>{
        setNeww(event.target.value);
    }

    const handleOldChange = event =>{
        setOld(event.target.value);
    }

    const handleRenewChange = event =>{
        setRenew(event.target.value);
    }
    


    const handleSubmit = event =>{
        const inputData = { email, fullName};
         
        updProfile(inputData);

        event.preventDefault();
    }
    const handleSubmitPass = event =>{
        const inputData = { email, old, neww, renew };
         
        changePass(inputData);

        event.preventDefault();
    }

    async function updProfile(data){
         
        const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/updProfile", {
          method: "PUT",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type" : "application/json",
            "Authentication": bearer
          },
          redirect: "follow",
          referrerPolicy: "no-referrer", 
          body: JSON.stringify(data)
        });
        setMsg('SUCCESS');
        if(response.status==200){
            let res = await response.json();
           
            console.log(res);
        }
      }
   
      async function changePass(data){
         
        const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/changePass", {
          method: "PUT",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          headers: {
            "Content-Type" : "application/json",
            "Authentication": bearer
          },
          redirect: "follow",
          referrerPolicy: "no-referrer", 
          body: JSON.stringify(data)
        });
        console.log(JSON.stringify(data));
        
        if(response.status==200){
            let res = await response.json();
            setMsg('SUCCESS');
            setMsg2('');
        }
        else{
            setMsg2('ERROR');
            setMsg('');
        }
      }
    async function loadData() {


        
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

        const response = await fetch("http://localhost:8000/api/profile", {
            method:'GET',
            headers: {
              "Content-Type": "application/json",
              "Authorization": bearer
            }
        });

        let profData = await response.json();
        
        setEmail(profData.email);
        setFullName(profData.fullName);
//setId(profData.id);
//setRoles(profData.roles);

      }
    
    
    
      useEffect(() => {
    
    
    
        loadData();
        
    
    
      }, []);




    return (
        <div className = "container">
            <h1 className="text-success"> {msg} </h1> <br/>
            <h1 className="text-danger"> {msg2} </h1> <br/>
            Hello  {fullName}
            <div className = "row mt-3">
                <div className = "col-6 mx-auto">
                    <form onSubmit = {handleSubmit}>
                        <div className = "form-group">
                            <label>
                                Email : 
                            </label>
                            <input type = "email"  readOnly  className = "form-control" value = {email} onChange = {handleEmailChange}/>
                        </div>
                        <div className = "form-group">
                            <label>
                                Full name : 
                            </label>
                            <input type = "text" className = "form-control" value = {fullName} onChange = {handleNameChange}/>
                        </div>
                        <div className = "form-group">
                            <button className = "btn btn-success" >UPDATE</button>
                        </div>
                         
                    </form>


                    <form onSubmit = {handleSubmitPass}>
                        <div className = "form-group">
                            <label>
                                Old : 
                            </label>
                            <input type = "text"    className = "form-control" value = {old} onChange = {handleOldChange}/>
                        </div>
                        <div className = "form-group">
                            <label>
                                New : 
                            </label>
                            <input type = "text" className = "form-control" value = {neww} onChange = {handleNewChange}/>
                        </div>
                        <div className = "form-group">
                            <label>
                               Re New : 
                            </label>
                            <input type = "text" className = "form-control" value = {renew} onChange = {handleRenewChange}/>
                        </div>

                        <div className = "form-group">
                            <button className = "btn btn-success" >UPDATE</button>
                        </div>
                         
                    </form>




                </div>
            </div>
        </div>
    )
}

export default Profile;