import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MDBTextArea } from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import { useCommentsContext } from "../hooks/useCommentsContext";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';
import {
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBInput
  } from "mdb-react-ui-kit"; 
const BlogDetails = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const {user} = useAuthContext();
    const userEmail = {user};
    const email = JSON.stringify(userEmail.email);
    console.log(email);
    const [BlogDetails, setBlogDetails] = useState(null);
    
    const fetchBlog = async () => {
        const response = await fetch("/api/routes/details/" + id);
        const json = await response.json();
        //console.log(json);
        if(response.ok){
            setBlogDetails(json);
        }
    }
    
    // use to input comment 
    const [comment, setComment] = useState('');
    const [userName, setUserName] = useState('');
    const {comments, dispatch} = useCommentsContext();
    //const [userComment, setuserComment] = useState(null);


    // Post comments from users
    const handleComment = async (event) =>{

        event.preventDefault();
        const UserComment = {userName, comment};
        const response = await fetch("/api/user/comment/" + id, {  
            method: "POST",
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify(UserComment)
        });
        // const json = await response.json();
        // console.log(json);
    }
    
    const getComments = async () => {
        const response = await fetch("/api/user/getComments/" + id); 
        const json = await response.json();
        if(response.ok){
            const user = json.userName;
            console.log(user)
            dispatch({type:'CREATE_COMMENTS', payload: json})
            //setuserComment(json);
        }
    }


    useEffect(()=>{
        fetchBlog();
        handleComment();
        getComments();
    }, [])



    return (
        <Container className='custom-Home'>
            <Row>
                <Col>
                    <h3>{BlogDetails && BlogDetails.title}</h3>
                    <h4>Author: {BlogDetails && BlogDetails.author} </h4>
                    <p>{BlogDetails && BlogDetails.content}</p>
                    <div style={{maxWidth: "100%"}} className='line'></div>       
                </Col>
            </Row>
            {comments && Object.keys(comments).map((data_comments, i)=>(
                <Row className="custom-comments">
                    <Col>
                        <MDBContainer style={{ maxWidth: "1000px", margin: "10px 0px" }}>
                            <MDBRow className="justify-content-left">
                                <MDBCol md="8" lg="6" style={{padding: "0"}}>
                                <MDBCard
                                    className="shadow-0 border"
                                    style={{ backgroundColor: "#f0f2f5" }}
                                >
                                    <MDBCardBody>

                                    <MDBCard className="mb-4">
                                        <MDBCardBody>
                                        <p>{comments[data_comments].Comments}</p>

                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex flex-row align-items-center">
                                            <MDBCardImage
                                                src="https://vtv1.mediacdn.vn/thumb_w/650/2014/incognito-chrome-spicytricks-1420018283508.jpg"
                                                alt="avatar"
                                                width="25"
                                                height="25"
                                            />
                                            <p className="small mb-0 ms-2">{comments[data_comments].userName}</p>
                                            </div>
                                            <div className="d-flex flex-row align-items-center">
                                            <MDBIcon
                                                far
                                                icon="thumbs-up mx-2 fa-xs text-black"
                                                style={{ marginTop: "-0.16rem" }}
                                            />
                                            </div>
                                        </div>
                                        </MDBCardBody>
                                    </MDBCard>
                                    </MDBCardBody>
                                </MDBCard>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </Col>
                </Row>
            ))}
            
            
            {user && (
            <Row>
                <Col>
                <div><strong><h3 style={{margin: "20px 0"}} >Commen section: </h3></strong></div>
                    <MDBInput wrapperClass='' labelClass='text-dark' placeholder="Your Name" id='formControlLg' type='email' size="lg" style={{margin: "10px 0px"}}
                    value={userName} required onChange={(event) => setUserName(event.target.value)}/>
                    <MDBTextArea placeholder="Your Comment" type='text' style={{marginBottom: '10px'}} rows={4} 
                        value={comment} required onChange={(event) => setComment(event.target.value)}
                    />
                    <Button variant="primary" className='custom-btn' onClick={handleComment}>Submit</Button>{' '}
                    <Button variant="primary" className='custom-btn' onClick={()=>navigate("/")}>Go back to Home Page</Button>{' '}
                </Col>
            </Row>)}
        </Container>
    );
}
 
export default BlogDetails;