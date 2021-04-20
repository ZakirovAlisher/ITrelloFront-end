import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import {useCookies} from 'react-cookie';

function Search(props){



  const [name, setName] = useState("");
  const handleNameChange = event =>{
    setName(event.target.value);
  }

  const handleSubmit = event =>{


    setName("");
    props.setSname(name);
    
    event.preventDefault();

  }


  return (
    <div className = "container">
   
<form onSubmit = {handleSubmit}>
                <div className = "form-group row">
                
                <input type = "text" className = "form-control" value = {name} onChange = {handleNameChange} />
                </div>
              
                <div className = "form-group">
                <button className = "btn btn-success float-right">SEARCH</button>
            
                </div>
            </form>

    </div>
  );
}

function ListCards({newCardAddedId, sname}){
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
  const [data, setData] = useState([]);



  async function loadSData() {


    let response;
    

     response = await fetch("http://localhost:8000/api/search/" + sname);

    let tableData = await response.json();
    setData(tableData);

  }


  async function loadData() {


    let response;
    if (sname == "")
    { 
      const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;
       response = await fetch("http://localhost:8000/api/allcards", {
        method:'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": bearer
        }
    });
 
     
    
    }
    else{

     response = await fetch("http://localhost:8000/api/search/" + sname);

}
    let tableData = await response.json();
    setData(tableData);
  }



  useEffect(() => {



    loadData();
    


  }, [newCardAddedId, sname]);


if(data.length != 0){
  return (

<div className = "container">
<h4> {sname ? `Search results for:  ${sname}` : ''} </h4>
         
    <div className = " row">
       
            {data?.map(row=>(

          <div key = {row.id} className="col-4 p-4 ">
              <div  className="card  shadow-lg">
              
                
                <div className="card-body">
                  {row.name}
                
                </div>
                
                <div className="card-footer">
                  
                <span className="text-muted">  {row.addedDate}</span>  
                  <a className = "btn btn-primary btn-sm float-right" href = {`/gettasks/${row.id}`}>DETAILS</a>
                </div>
                
              
              </div>
              </div>
            ))}
          
         
    </div>
    </div>


  )
            }
            else{
              return(
                <div className = "container">
                  
                <h4> {sname ? `Search results for: ${sname}` : ''} </h4>


              <div className = "  text-center">
                 
              <h1>  No results </h1>
                <img src="https://cdn.pixabay.com/photo/2016/12/05/12/28/the-prohibition-of-1883798_960_720.png" height="200" width="200"/>
                </div></div>);
            }




}
function getCurrentDate(separator='-'){

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
  }

function Cards(){

 

  const [name, setName] = useState("");
  //const [newId, setNewId] = useState(0);
  const [newId, setNewId] = useState(0);
  const [message, setMessage] = useState("");
  const [sname, setSName] = useState("");
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

  const handleNameChange = event =>{
    setName(event.target.value);
  }

 

  const handleSubmit = event =>{
    let addedDate = getCurrentDate();
    const inputData = {name, addedDate}
    addCard(inputData);
    setName("");
     
    event.preventDefault();

  }
  

  async function addCard(data){

    const bearer = "Bearer " + cookieJWT['jwt'].jwtToken;

    const response = await fetch("http://localhost:8000/api/addcard", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type" : "application/json",
        "Authorization": bearer
      },
      redirect: "follow",
      referrerPolicy: "no-referrer", 
      body: JSON.stringify(data)
    });

    let messageData = await response.json();
    setSName("");
    setMessage(messageData.id? "Data added" + messageData : "Error!"); 
    setNewId(messageData.id);
  }

   

  return (
    <div className = "container">
      <Search setSname = {setSName}/>
      <div className = "row">
        <div className = " card shadow-lg col-6 mx-auto">
          <form onSubmit = {handleSubmit}>
            <div className = "form-group">
              <label>
               
              </label>
              <input type = "text" className = "form-control" value = {name} onChange = {handleNameChange} required/>
            </div>
           
            <div className = "form-group">
              <button className = "btn btn-success float-right mb-3" >ADD CARD</button>
            </div>
          </form>
        </div>
      </div>  
      <div className = "row mt-3">
        <div className = "col-12">
          <ListCards newCardAddedId = {newId} sname = {sname}/>
        </div>
      </div>
     </div>
  )

}

export default Cards;