import React, { useState } from "react"
import RadioContainer from "./RadioContainer";
import { useGlobalContext } from "./Context";

const Form = ()=>{
    const {handleChange,handleSubmit,userData,alert,nameError,phoneError,addressError,radioError,status,statusMessage} = useGlobalContext()
    const {name,phone,address,radioValue,qnt,noOfPeople,price} = userData
    return ( 
        <section className = "form-container">
            <h1>DoorStep Chai</h1>
            <form>
                {status && <p className = {statusMessage.code == "200" ? "success" : "message"}>{statusMessage.message}</p>}
                <label>
                    <span>name</span>
                    <input onChange = {handleChange} value = {name} type = "text" name = "name"/>
                    {nameError && <p className = "message">{name.length > 2 ? "" : nameError}</p>}
                </label>
                <label>
                    <span>phone</span>

                    <input onChange = {handleChange} value = {phone} type = "tel" name = "phone"/>
                    {phoneError && <p className = "message">{phone.match(/^[7-9][0-9]{9}$/) == null ? phoneError : ""}</p>}
                </label>

                <label>
                    <span>address</span>
                    <textarea value = {address} onChange = {handleChange} name = "address">

                    </textarea>
                    {addressError && <p className = "message">{address.length > 10 ? "" : addressError}</p>}
                </label>

                <RadioContainer/>
                {radioError && <p className = "message">{radioValue ? "" : radioError}</p>}
                
                <div className = "range-container">
                    <span>quantity of sugar</span>
                    <input onChange = {handleChange} value = {qnt} name = "qnt" type = "range" min = "1" max = "5">
                        </input>
                    <p className = "normal">Normal</p>
                </div>

                <label>
                    <span>choose cup of tea</span>
                    <input onChange = {handleChange} value = {noOfPeople} name = "noOfPeople" type = "number" min = "1" max = "10"/>
                </label>
                <div className = "form-footer">
                    <p className = "price">price: {price}rs</p>
                    <button onClick = {handleSubmit} className = "order" type = "submit">order</button>
                </div>
            </form>
        </section>
    )
}
export default Form;