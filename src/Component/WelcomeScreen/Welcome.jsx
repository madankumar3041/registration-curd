import React from 'react'
import './Welcome.css'
import { useHistory } from 'react-router-dom'
function Welcome() {
    const history = useHistory();
    const gotoEmployeeDetails = () => {
        
        history.push('/employee-lists');
    }
    return (
        <div className="final_page_welcome_customer_outline">
            <div className="final_page_welcome_customer_div">
                <p className="final_page_welcome_heading">
                    Your Registration has been Submitted Successfully!
                </p>
                <div className="final_page_welcome_customer_msg">
                    <p className="final_page_welcome_customer_msg_p">
                        Welcome,
                        <br />
                        You are Successfully registered...
                    </p>
                </div>
                <div className="final_page_welcome_customer_btn">
                    <p onClick={() => gotoEmployeeDetails()} style={{ textDecoration: 'none' }}>
                        <button className="btn-list">
                            Employee List
                            </button>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Welcome
