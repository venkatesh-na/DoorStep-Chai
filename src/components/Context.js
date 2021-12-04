import React , { useState, useContext , useEffect} from "react"
const AppContext = React.createContext()

const AppProvider = ({children})=>{
    const [userData,setUserData] = useState({
        name:"",
        phone:"",
        address:"",
        radioValue:"",
        qnt:3,
        noOfPeople:1,
        price:5
    })

    //error message
    const [nameError,setNameError] = useState("")
    const [phoneError,setPhoneError] = useState("")
    const [addressError,setAddressError] = useState("")
    const [radioError,setRadioError] = useState("")
    const [numberError,setNumberError] = useState("")
    const [status,setStatus] = useState(false)

    //message accordin to status code
    const [statusMessage,setStatusMessage] = useState({code:"",message:""})

    //handle Input onChange
    const handleChange = (e)=>{
        const fieldName = e.target.name
        const value = e.target.value
        setUserData({...userData,[fieldName]:value})
        }

        useEffect(()=>{
            //dynamic price change
            setUserData({...userData,price:userData.noOfPeople*5})
        },[userData.noOfPeople])

    //handle Form submission
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const {name,phone,address,radioValue,qnt,noOfPeople,price} = userData
        if(name.length > 2 && phone.match(/^[7-9][0-9]{9}$/) !== null && address && radioValue && noOfPeople > 0)
        {
            try
            {
            const res = await fetch("https://doorstep-chai-e0ce8-default-rtdb.firebaseio.com/userData.json",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name,
                    phone,
                    address,
                    radioValue,
                    qnt,
                    noOfPeople,
                    price
            })})
            if(res.status === 200)
            {
                setNameError("")
                setPhoneError("")
                setAddressError("")
                setRadioError("")
                setUserData({
                    name:"",
                    phone:"",
                    address:"",
                    radioValue:"",
                    qnt:"",
                    noOfPeople:"",
                    price:""
                })

                //scroll to top for message showcase
                window.scrollTo({
                    top:0,
                })

                setStatus(true)
                setStatusMessage({code:"200",message:"Thank Yor for ordering from DoorStep Chai"})
                setTimeout(()=>{
                    setStatus(false)
                    setStatusMessage({code:"",message:""})
                },3000)
            }
            else if(res.status === 423)
            {
                //database is locked
                window.scrollTo({
                    top:0,
                })
                setStatus(true)
                setStatusMessage({code:"420",message:"DoorStep Chai is closed try again on 7 AM"})
                 setTimeout(()=>{
                    setStatus(false)
                    setStatusMessage({code:"",message:""})
                },3000)
            }
        }
        catch(error)
        {
            //internet error
            window.scrollTo({
                    top:0,
                })
            setStatus(true)
            setStatusMessage({code:"",message:"please turn on your internet"})
            setTimeout(()=>{
                    setStatus(false)
                    setStatusMessage({code:"",message:""})
                },3000)
        }
        }
        else
        {
            if(name.length < 3)
            {
               setNameError("please enter your name")
            }
            if(phone === "" || phone.match(/^[7-9][0-9]{9}$/) == null)
            {
                setPhoneError("please enter your valid phone number")
            }
            if(address === "")
            {
                setAddressError("please enter your address")
            }
            if(radioValue === "")
            {
                setRadioError("select any tea flavour")
            }
            if(noOfPeople === "0")
            {
                setNumberError("Enter no of cups of tea")
            }
            if(noOfPeople < 0)
            {
                setNumberError("please enter a positive number")
            }
        }
    }
    return (
        <AppContext.Provider value = {
            {handleChange,
            handleSubmit,
            userData,
            nameError,
            phoneError,
            addressError,
            radioError,
            numberError,
            status,
            statusMessage}}>
            {children}
        </AppContext.Provider>
    )
} 

const useGlobalContext = ()=>{
    return useContext(AppContext)
}

export { AppProvider , useGlobalContext}