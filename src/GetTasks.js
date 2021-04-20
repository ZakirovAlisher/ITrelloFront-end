import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

 
function Cardd(){
    const [data, setData] = useState([]);
    let {itemId} = useParams();

    async function loadData() {
        let response = await fetch("http://localhost:8000/api/getcardedit/"+itemId);
        let tableData = await response.json();
        setData(tableData);
      }
    
      useEffect(() => {
        loadData();
      }, []);
    
    return (



        <div className = "container col-7 mb-3">
            
            <div  className="card  shadow-lg">
                
                  
                <div className="card-body">
                  {data.name}
                  <a className = "btn btn-primary btn-sm float-right" href = {`/getcardedit/${data.id}`}>EDIT</a>
                </div>
                
                <div className="card-footer">
                  
                <span className="text-muted">  {data.addedDate}</span> 
                
        





                </div>
                
              
              </div>
  
            
        </div>
      )
    
}

function ListTasks({newCardAddedId}){

    let {itemId} = useParams();
    const [data, setData] = useState([]);

    const [x, setX] = useState(false);
   

    async function checkDone(id){
        const response = await fetch("http://localhost:8000/api/cardTaskDone/"+id, {
        method: "PUT",
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
        let messData = await response.json();
         
    }

    async function loadData() {
      let response = await fetch("http://localhost:8000/api/gettasks/"+itemId);
      let tableData = await response.json();
      setData(tableData);
    }
  
    useEffect(() => {
      loadData();
    }, [newCardAddedId]);
  
    return (



      <div className = "container ">
          
          

          <div className = "row ">

           
              {data?.map(row=>(
                    
            <div key = {row.id} className="col-4 p-4 ">
                <div  className="card  shadow-lg">
                
                  
                  <div className="card-body">
                    {row.taskText}
                     {console.log(row.done)}
                  </div>
                  
                  <div className="card-footer">
                    
                  <span className="text-muted">  {row.addedDate}</span> 
                  
                   
            

            <div class="custom-control custom-switch">
  <input type="checkbox" class="custom-control-input" id={row.id}  defaultChecked={row.done} onChange={()=>checkDone(row.id)} />
  <label class="custom-control-label" for={row.id}></label>
</div>





                  </div>
                  
                
                </div>
                </div>
              ))}
            
            </div>   
      </div>
    )
  
  }

function GetTasks(){

    let {itemId} = useParams();
  
    const [taskText, setName] = useState("");
    //const [newId, setNewId] = useState(0);
    const [newId, setNewId] = useState(0);
    const [message, setMessage] = useState("");
    const [data, setData] = useState([]);

    const handleNameChange = event =>{
      setName(event.target.value);
    }
    async function loadData() {
        let response = await fetch("http://localhost:8000/api/gettasks/"+itemId);
        let tableData = await response.json();
        setData(tableData);
      }
    
    function getCurrentDate(separator='-'){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
        }

    const handleSubmit = event =>{
      let addedDate = getCurrentDate();
      const inputData = { addedDate,taskText}
      addTask(inputData);
      setName("");
       
      event.preventDefault();
  
    }
  
    async function addTask(data){
      const response = await fetch("http://localhost:8000/api/addCardTask/" + itemId, {
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

      let messData = await response.json();
      setMessage(messData.id? "Data Added" : "Error");
      setNewId(messData.id);
    }



   useEffect(() => {
      loadData();
    }, []);

   

    

    return (
        <div className = "container">


 
<Cardd/>


<div className = " card shadow-lg col-6 mx-auto">
          <form onSubmit = {handleSubmit}>
            <div className = "form-group">
              <label>
               
              </label>
              <input type = "text" className = "form-control" value = {taskText} onChange = {handleNameChange} required/>
            </div>
           
            <div className = "form-group">
              <button className = "btn btn-success float-right mb-3" >ADD TASK</button>
            </div>
          </form>
        </div>




        <div className = "row">
           <ListTasks newCardAddedId = {newId}  />
        </div>     
        </div>
    )

}

export default GetTasks;