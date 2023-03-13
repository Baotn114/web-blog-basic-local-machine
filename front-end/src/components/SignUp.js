import { useState } from "react";
//import { useAuthContext } from "../hooks/useAuthContext"
import Alert from 'react-bootstrap/Alert';
import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput
}
from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //const {dispatch} = useAuthContext();
    const [error, setError] = useState(null)


    const handleSubmit = async (event) => {
        setError(null);
        if (event && event.preventDefault) { event.preventDefault(); }
        event.preventDefault();
        const userSignup = {email, password};
        const response = await fetch("/api/user/signup",{
            method: "POST",
            body: JSON.stringify(userSignup),
            headers: {"Content-type" : "application/json"} 
        })
        const json = await response.json()
        console.log(json);
        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            // save the user to local storage
            //localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            //dispatch({type: "LOGIN", payload: json}) 
            navigate("/sign-in")
        }
    }
    return ( 
        <div className='custom-Signup'>
          <MDBContainer fluid>

                <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                        
                        {error && (
                            <Alert  variant='danger'>
                                {error}
                            </Alert>
                        )}

                        <div className="d-flex flex-row align-items-center mb-4">
                          <MDBInput label='Your Email' id='form2' type='email' value={email} required onChange={(event) => setEmail(event.target.value)}/>
                          
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <MDBInput label='Password' id='form3' type='password' value={password} required onChange={(event) => setPassword(event.target.value)}/>
                          
                        </div>
                        <MDBBtn className='mb-4' size='lg' onClick={handleSubmit}>Register</MDBBtn>

                      </MDBCol>

                      <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                        <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
                      </MDBCol>

                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBContainer>
      </div>
    );
}
 
export default SignUp;