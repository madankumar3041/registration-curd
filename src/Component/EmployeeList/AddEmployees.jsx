import React, { useState } from 'react'
import '../EmployeeList/EmployeeList.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
function AddEmployees(props) {

    const [employee, setEmployee] = useState({})

    const handleChange = (event) => {
        setEmployee((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
        setValidation("")
    }


    const GetBackData = React.useCallback(() => {
        axios({
            "method": "GET",
            "url": `http://localhost:3001/users`,
            "headers": {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                if (response.data) {
                    
                    const matchItem = response.data?.filter(itm => (itm?.id)  === parseInt(props?.match?.params?.employee_id));
                    if (matchItem?.length) {
                        const itm = matchItem[0];
                        setEmployee({ ...itm })
                    }
                }
            })
    }, [])
    React.useEffect(() => {
        GetBackData()
    }, [])
    const [Validation, setValidation] = useState({});
    const handleSubmit = () => {

        var errorhandle = false;
        if (!employee?.first_name) {
            document.getElementById("first_name")?.focus();
            setValidation(prevState => ({
                ...prevState,
                first_name: 'Please enter the first name'

            }))
            errorhandle = true;
        }
        else if (!employee?.last_name) {
            document.getElementById("last_name")?.focus();
            setValidation(prevState => ({
                ...prevState,
                last_name: 'Please enter the last name'

            }))
            errorhandle = true;
        }
        else if (!employee?.email) {
            document.getElementById("email")?.focus();
            setValidation(prevState => ({
                ...prevState,
                email: 'Please enter the e-mail'

            }))
            errorhandle = true;
        }
        else if (employee?.email && !(employee?.email).match(/^[^@]+@[^@]{2,}\.[^@]{2,}$/)) {
            document.getElementById("email").focus();
            setValidation(prevState => ({
                ...prevState,
                email: 'Please provide valid e-mail address.' 
            }))
            errorhandle = true;
        }
       
        else if (!employee?.designation) {
            document.getElementById("designation")?.focus();
            setValidation(prevState => ({
                ...prevState,
                designation: 'Please select the designation'

            }))
            errorhandle = true;
        }
        else if (!employee?.password) {
            document.getElementById("password").focus();
            setValidation(prevState => ({
                ...prevState,
                password: 'Please enter the password'
            }))
            errorhandle = true;
        }
        else if ((employee?.password?.toString()?.length)< 6) {
            document.getElementById("password").focus();
            setValidation(prevState => ({
                ...prevState,
                password: 'Length must be greater than six password'
            }))
            errorhandle = true;
        }
        if (errorhandle === false) {
            onEdit();

        }
    }
    const onEdit = () => {
        var id = props?.match?.params?.employee_id
        var data = {
            "first_name": employee?.first_name,
            "last_name": employee?.last_name,
            "email": employee?.email,
            "designation": employee?.designation,
            "gender": employee?.gender,
            "password": employee?.password,
        }
       if(id){
        axios.put(`http://localhost:3001/users/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
            window.location.href = '#/employee-lists'
            alert("UserDetails Updated Successfully...!")
        }).catch((err) => {

        });
       }
       else{
         axios.post(`http://localhost:3001/users`, data, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
            window.location.href = '#/employee-lists'
            alert("UserDetails Added Successfully...!")
        }).catch((err) => {

        });
       }
    }
    return (
        <div className="main-center">
            <div className="box center" >
                <h1 className="heading">
                    {props?.match?.params?.employee_id ? "Edit " : "Add "} Employee
                </h1>
                <input type="text" name="first_name"id="first_name" required className="input" placeholder="Enter first name" value={employee?.first_name} onChange={handleChange} />
                <label className="error-message">{Validation?.first_name}</label>
               
                <input type="text" name="last_name" id="last_name" required className="input" placeholder="Enter last name" value={employee?.last_name} onChange={handleChange} />
                <label className="error-message">{Validation?.last_name}</label>
                <input type="email" id="email" name="email" required className="input" placeholder="Enter e-mail" value={employee?.email} onChange={handleChange} />
                <label className="error-message">{Validation?.email}</label>

                <select name="designation" id="designation" className="input" value={employee?.designation} onChange={handleChange}>
                    <option >Select designation</option>
                    <option value="accounting">Accounting</option>
                    <option value="human resource">Human Resources</option>
                    <option value="management">Management</option>
                    <option value="other">Other</option>
                </select>
                <label className="error-message">{Validation?.designation}</label>

                <input type="password" id="password" name="password" value={employee?.password} className="input" required autoComplete="new-password" placeholder="Create password" onChange={handleChange} />
                <label className="error-message">{Validation?.password}</label>

                <button className="btn" onClick={() => handleSubmit()}>{props?.match?.params?.employee_id ? "Update" : "Save "} </button>

            </div>

        </div>
    )
}

export default AddEmployees
