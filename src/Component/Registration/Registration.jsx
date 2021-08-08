import React,{useState} from 'react'
import './Registration.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
function Registration() {

    const[registration,setRegitsration]=useState({})

   const handleChange=(event)=>{
setRegitsration((prevState) => ({
    ...prevState,
    [event.target.name]: event.target.value,
}));
setValidation("")
    }


    const [Validation, setValidation] = useState({});
    const handleSubmit = () => {

        var errorhandle = false;
        if (!registration?.first_name) {
            document.getElementById("first_name")?.focus();
            setValidation(prevState => ({
                ...prevState,
                first_name: 'Please enter the first name'

            }))
            errorhandle = true;
        }
        else if (!registration?.last_name) {
            document.getElementById("last_name")?.focus();
            setValidation(prevState => ({
                ...prevState,
                last_name: 'Please enter the last name'

            }))
            errorhandle = true;
        }
        else if (!registration?.email) {
            document.getElementById("email")?.focus();
            setValidation(prevState => ({
                ...prevState,
                email: 'Please enter the e-mail'

            }))
            errorhandle = true;
        }
        else if (registration?.email && !(registration?.email).match(/^[^@]+@[^@]{2,}\.[^@]{2,}$/)) {
            document.getElementById("email").focus();
            setValidation(prevState => ({
                ...prevState,
                email: 'Please provide valid e-mail address.' 
            }))
            errorhandle = true;
        }
       
        else if (!registration?.designation) {
            document.getElementById("designation")?.focus();
            setValidation(prevState => ({
                ...prevState,
                designation: 'Please select the designation'

            }))
            errorhandle = true;
        }
        else if (!registration?.password) {
            document.getElementById("password").focus();
            setValidation(prevState => ({
                ...prevState,
                password: 'Please enter the password'
            }))
            errorhandle = true;
        }
        else if ((registration?.password?.toString()?.length)< 6) {
            document.getElementById("password").focus();
            setValidation(prevState => ({
                ...prevState,
                password: 'Length must be greater than six password'
            }))
            errorhandle = true;
        }
       
        else if (!registration?.confrimpassword) {
            document.getElementById("confrim_password").focus();
            setValidation(prevState => ({
                ...prevState,
                confrim_password: 'Please enter confrim password'
            }))
            errorhandle = true;
        }
        else if ((registration?.confrimpassword?.toString()?.length)< 6) {
            document.getElementById("password").focus();
            setValidation(prevState => ({
                ...prevState,
                confrim_password: 'Length must be greater than six password'
            }))
            errorhandle = true;
        }
         if ((registration?.password) !== (registration?.confrimpassword)) {
                document.getElementById("confrim_password").focus();
                setValidation(prevState => ({
                    ...prevState,
                    confrim_password: "Password doesn't matches"
                }))
                errorhandle = true;
            }
        if (errorhandle === false) {
            AddEmployeeDetails();

        }
    }
   const AddEmployeeDetails = async () => {
        var data ={
          "first_name":registration?.first_name,
          "last_name":registration?.last_name,
          "email":registration?.email,
      "designation": registration?.designation,
      "gender":registration?.gender,
      "password":registration?.password,
        }
        await axios.post(`http://localhost:3001/users`, data, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
           window.location.href ='#/welcome-user'
            // if (res.data.success) {
            //     const matchItem = res.data.data.filter(itm => itm.id === this.props.boat_timeslot_id);

            //     if (matchItem?.length) {
            //         const itm = matchItem[0];
            //         this.setState({
            //             ...itm
            //         })

            //     }
            // }
        }).catch((err) => {
           
        });
    }
    return (
        <div className="main-center">
            <div className="box center" >
                <h1 className="heading">
Registration
                </h1>
                <input type="text" name="first_name" id="first_name" required  className="input" placeholder="Enter first name" onChange={handleChange}/>
                <label className="error-message">{Validation?.first_name}</label>
                <input type="text" name="last_name" id="last_name"required  className="input" placeholder="Enter last name" onChange={handleChange}/>
                <label className="error-message">{Validation?.last_name}</label>
                <input type="email" name="email" id="email" required  className="input" placeholder="Enter e-mail" onChange={handleChange}/>
                <label className="error-message">{Validation?.email}</label>
 {/* <div className="gender center">
     <input type="radio" name="gender" value="male"onChange={handleChange}/>
     <input type="radio" name="gender" value="female"onChange={handleChange}/>
 </div> */}
 <select name="designation"id="designation" className="input" onChange={handleChange}>
 <option >Select designation</option>
     <option value="accounting">Accounting</option>
     <option value="human resource">Human Resources</option>
     <option value="management">Management</option>
     <option value="other">Other</option>
 </select>
 <label className="error-message">{Validation?.designation}</label>
 <input type="password" name="password" className="input" id="password" required autoComplete="new-password" placeholder="Create password" onChange={handleChange}/>
 <label className="error-message">{Validation?.password}</label>
 <input type="password" name="confrimpassword" id="confrim_password" className="input"  required  placeholder="Re-enter password" onChange={handleChange}/>
 <label className="error-message">{Validation?.confrim_password}</label>
 <button className="btn" onClick={()=>handleSubmit()}>Sign Up</button>

            </div>
            
        </div>
    )
}

export default Registration
