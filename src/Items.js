import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

 

function ListItems({newItemAddedId}){

  const [data, setData] = useState([]);

  async function loadData() {
    let response = await fetch("http://localhost:8000/api/allitems");
    let tableData = await response.json();
    setData(tableData);
  }

  useEffect(() => {
    loadData();
  }, [newItemAddedId]);

  return (
    <div className = "container">
        <table className = "table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>AMOUNT</th>
              <th>EDIT</th>
            </tr>
          </thead>
          <tbody>
            {data?.map(row=>(
              <tr key = {row.id}>
                <td>
                  {row.id}
                </td>
                <td>
                  {row.name}
                </td>
                <td>
                  {row.price}
                </td>
                <td>
                  {row.amount}
                </td>
                <td width = "10%">
                    <a className = "btn btn-primary btn-sm" href = {`/edititem/${row.id}`}>EDIT</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  )

}

function Items(){
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [newId, setNewId] = useState(0);
  const [message, setMessage] = useState("");

  const handleNameChange = event =>{
    setName(event.target.value);
  }

  const handlePriceChange = event =>{
    setPrice(event.target.value);
  }

  const handleAmountChange = event =>{
    setAmount(event.target.value);
  }

  const handleSubmit = event =>{

    const inputData = {name, price, amount}
    addItem(inputData);
    setName("");
    setPrice(0);
    setAmount(0);
    event.preventDefault();

  }

  async function addItem(data){
    const response = await fetch("http://localhost:8000/api/additem", {
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

  return (
    <div className = "container">
      <div className = "row">
        <div className = "col-6 mx-auto">
          <form onSubmit = {handleSubmit}>
            <div className = "form-group">
              <label>
                NAME : 
              </label>
              <input type = "text" className = "form-control" value = {name} onChange = {handleNameChange} required/>
            </div>
            <div className = "form-group">
              <label>
                PRICE : 
              </label>
              <input type = "number" className = "form-control" value = {price} onChange = {handlePriceChange} required/>
            </div>
            <div className = "form-group">
              <label>
                AMOUNT : 
              </label>
              <input type = "number" className = "form-control" value = {amount} onChange = {handleAmountChange} required/>
            </div>
            <div className = "form-group">
              <button className = "btn btn-success" >ADD ITEM</button>
            </div>
          </form>
        </div>
      </div>  
      <div className = "row mt-3">
        <div className = "col-12">
          <ListItems newItemAddedId = {newId}/>
        </div>
      </div>
     </div>
  )

}

export default Items;