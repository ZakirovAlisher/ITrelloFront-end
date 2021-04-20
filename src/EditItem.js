import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

 

function EditItem(){

    let {itemId} = useParams();
  
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(()=>{
        getItem(itemId);
    },[]);

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

        const inputData = {id, name, price, amount};
        saveItem(inputData);
        event.preventDefault();

    }

    async function setData(data) {
        setId(data.id);
        setName(data.name);
        setPrice(data.price);
        setAmount(data.amount);
    }

    async function saveItem(data){
        const response = await fetch("http://localhost:8000/api/saveitem", {
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
        setMessage(messData.id? "Data Saved" : "Error");
    }

    async function getItem(itemId) {
        let response = await fetch("http://localhost:8000/api/getitem/"+itemId);
        if(response.status==200){
            let data = await response.json();
            setData(data);
        }else{
            setMessage("404 ITEM NOT FOUND");
        }
    }

    async function toDeleteItem() {
        const inputData = {id, name, price, amount};
        deleteItem(inputData);
    }

    async function deleteItem(data){
        const response = await fetch("http://localhost:8000/api/deleteitem", {
        method: "DELETE",
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
        setMessage(messData.id? "Data Deleted" : "Error");
    }

    return (
        <div className = "container">
        <div className = "row">
            <div className = "col-6 mx-auto">
            <h1>{message}</h1>
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
                <button className = "btn btn-success">SAVE ITEM</button>
                <button type = "button" className = "btn btn-danger ml-2" onClick = {toDeleteItem}>DELETE ITEM</button>
                </div>
            </form>
            </div>
        </div>     
        </div>
    )

}

export default EditItem;