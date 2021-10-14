import React from "react"
import { useGlobalContext } from "./Context"
const RadioContainer = ()=>{
    const {handleChange,userData} = useGlobalContext()
    const {radioValue} = userData
    return (
         <div className = "radio-container">
                    <p>choose your type </p>
                    <div>
                        <label className = {radioValue == "Ginger" ? "box" : ""}>
                            Ginger
                            <input onChange = {handleChange} value = "Ginger" type = "radio" name = "radioValue" checked = {radioValue == "Ginger" ? true : false}/>
                        </label>
                        <label  className = {radioValue == "Cardamom" ? "box" : ""}>
                            Cardamom
                            <input onChange = {handleChange} value = "Cardamom" type = "radio" name = "radioValue" checked = {radioValue == "Cardamom" ? true : false}/>
                        </label>
                        <label  className = {radioValue == "Mint" ? "box" : ""}>
                            Mint
                            <input onChange = {handleChange} value = "Mint" type = "radio" name = "radioValue" checked = {radioValue == "Mint" ? true : false}/>
                        </label>
                        <label  className = {radioValue == "Cocktail" ? "box" : ""}>
                            Cocktail
                            <input onChange = {handleChange} value = "Cocktail" type = "radio" name = "radioValue"  checked = {radioValue == "Cocktail" ? true : false}/>
                        </label>
                    </div>
                </div>
    )
}
export default RadioContainer;