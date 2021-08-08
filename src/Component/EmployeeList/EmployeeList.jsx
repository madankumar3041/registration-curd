import React, { useState } from 'react'
import './EmployeeList.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
function EmployeeList() {
    const [details, setDetails] = useState([]);
    const [sortOrder, setSortOrder]=useState({id:"asc",first_name:"",last_name:"",email:"",designation:""});
    const [sortField,setSortField]=useState("id");
    const GetBackData = React.useCallback(() => {
        axios({
            "method": "GET",
            "url": `http://localhost:3001/users`,
            "headers": {
                "content-type": "application/json",
            },
        })
            .then((response) => {
                var detailedData = response.data?.filter(item => item !== null)
                
                setDetails(detailedData)
            })
    }, [])
    React.useEffect(() => {
        GetBackData()
    }, [])
    const OnDelete = (id) => {
        
        axios.delete(`http://localhost:3001/users/${id}`, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
            
            GetBackData();
            alert("UserDetails Deleted Successfully...!")
        }).catch((err) => {

        });
    }

    const onSort=(details)=>{
        
        details?.sort((a, b) => {
            let x = a[sortField];
            let y = b[sortField];
            if(sortOrder[sortField]==="asc")
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            else
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
          });
          return details
    }
    const OnSortOrder=(sField)=>{
         
        if(sortOrder[sField] === "asc")   
        setSortOrder(prev => ({...prev, [sField]: "desc"}));
        else
        setSortOrder(prev => ({...prev, [sField]: "asc"}));
        setSortField(sField);
    }
    return (
        <div class="table-wrapper">
            <div class="main-class">
                Employee List
                <div style={{ fontSize: "12px", color: "gray",marginTop: "20px"}}>
            <font color="red">*</font>
              Note: Click on column name to sort.
            </div>
            </div>
           
            <Link to="/employee-add">
                <div class="sub-main">
                    <button class="button-two"><span>Create New</span></button>
                </div>
            </Link>
            <table class="table">
                <thead>
                    <tr>
                    {/* class="headerSortDown" */}
                        <th class={`${sortField==="id" && sortOrder["id"]==="asc" ? "headerSortUp":sortField==="id" && sortOrder["id"]==="desc"?"headerSortDown":""}`}><button class="sort" onClick={() => { OnSortOrder("id") }}>Empolyee ID</button></th>
                        
                        <th class={`${sortField==="first_name" && sortOrder["first_name"]==="asc" ? "headerSortUp":sortField==="first_name" && sortOrder["first_name"]==="desc"?"headerSortDown":""}`}><button class="sort" onClick={() => { OnSortOrder("first_name") }}>First Name</button></th>
                        <th class={`${sortField==="last_name" && sortOrder["last_name"]==="asc" ? "headerSortUp":sortField==="last_name" && sortOrder["last_name"]==="desc"?"headerSortDown":"" }`}><button class="sort" onClick={() => { OnSortOrder("last_name") }}>Last Name</button></th>
                        <th class={`${sortField==="email" && sortOrder["email"]==="asc" ? "headerSortUp":sortField==="email" && sortOrder["email"]==="desc"?"headerSortDown":"" }`}><button class="sort" onClick={() => { OnSortOrder("email") }}>E-mail</button></th>
                        <th class={`${sortField==="designation" && sortOrder["designation"]==="asc" ? "headerSortUp":sortField==="designation" && sortOrder["designation"]==="desc"?"headerSortDown":"" }`}><button class="sort" onClick={() => { OnSortOrder("designation") }}>Designation</button></th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        details?.length > 0 ? onSort(details).map(id => {
                            
                            return (
                                <>
                                    <tr>
                                    <td >{id?.id}</td>
                                        <td >{id?.first_name}</td>
                                        <td >{id?.last_name}</td>
                                        <td >{id?.email}</td>
                                        <td >{id?.designation}</td>
                                        <td >{id?.password ? "******" : null}</td>
                                        <td>
                                            <Link to={`/employee-add/` + id?.id}>
                                                <button class="button-one"> <img width="25" height="25" src="https://www.flaticon.com/premium-icon/icons/svg/3153/3153254.svg" class="loaded" alt="icon"></img> </button>
                                            </Link>
                                            <button class="button-one" onClick={() => { OnDelete(id?.id) }}> <img src="https://image.flaticon.com/icons/png/128/3155/3155746.png" data-src="https://image.flaticon.com/icons/png/128/3155/3155746.png" srcset="https://www.flaticon.com/premium-icon/icons/svg/3155/3155746.svg 4x" alt="Bin premium icon" title="Bin premium icon" width="25" height="25" class="lzy lazyload--done"></img> </button>

                                        </td>
                                    </tr>
                                </>
                            )

                        })
                            : "No details Found Create Employee Details"}
                </tbody>
            </table >
        </div >
    )
}

export default EmployeeList
