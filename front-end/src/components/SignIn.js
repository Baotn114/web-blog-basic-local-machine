import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput
  }
  from 'mdb-react-ui-kit';
const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {dispatch} = useAuthContext();
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const handleSubmit = async (event) =>{
        event.preventDefault();
        const userSignin = {email, password};
        const response = await fetch("/api/user/signin", {
            method: "POST",
            body: JSON.stringify(userSignin),
            headers: {"Content-type": "application/json"}
        })
        const json = await response.json();
        console.log(json)
        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            //update the auth context
            dispatch({type: "LOGIN", payload: json}) 
            navigate("/")
        }
    }

    return ( 
        <MDBContainer fluid>

        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
  
            <MDBCard className='bg-info text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
              <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
  
                <h2 className="fw-bold mb-2 text-dark">Login</h2>
                
                <p className="text-dark-50 mb-5 text-dark">Please enter your login and password!</p>
                
                {error && (
                    <Alert  variant='danger'>
                        {error}
                    </Alert>
                )}
                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-dark' label='Email address' id='formControlLg' type='email' size="lg" 
                value={email} required onChange={(event) => setEmail(event.target.value)}/>
                
                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-dark' label='Password' id='formControlLg' type='password' size="lg"
                value={password} required onChange={(event) => setPassword(event.target.value)}  />
  
                <p className="small mb-3 pb-lg-2"><a Class="text-dark-50" href="#!">Forgot password?</a></p>
                <MDBBtn outline className='mx-2 px-5' color='white' size='lg' onClick={handleSubmit}>
                  Login
                </MDBBtn>
                <div>
                  <p className="mb-0">Don't have an account? <a href="/sign-up" class="text-white-50 fw-bold">Sign Up</a></p>
  
                </div>
              </MDBCardBody>
            </MDBCard>
  
          </MDBCol>
        </MDBRow>
  
      </MDBContainer>
    );
}
 
export default SignIn;
