import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText
} from 'mdb-react-ui-kit';
import { MDBSpinner } from 'mdb-react-ui-kit';
const Home = () => {
    const [blogList, setBlogList] = useState(null);

    useEffect(()=>{
        const fetchBlog = async () => {
            const response = await fetch("/api/routes");
            const json = await response.json();

            if(response.ok){
                setBlogList(json)
            }
        }
        fetchBlog()
    }, [])
    return ( 
        <div className="blog-list">
            {!blogList 
            ?   <Container className='custom-Home'>
                    <MDBSpinner grow className='mx-2' color='info'>
                        <span className=''></span>
                    </MDBSpinner>
                    <MDBSpinner grow className='mx-2' color='info'>
                        <span className=''></span>
                    </MDBSpinner>  
                    <MDBSpinner grow className='mx-2' color='info'>
                        <span className=''></span>
                    </MDBSpinner>    
                </Container>
            : blogList.map((data_blog)=>(
                <Container className='custom-Home'>
                    <Row>
                        <Col>
                            <Link to={`/blogs/${data_blog._id}`} style={{textDecoration: "none", color: "#00b8e6"}}>
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBCardTitle>{data_blog.title}</MDBCardTitle>
                                        <MDBCardText>Author: {data_blog.author}</MDBCardText>
                                    </MDBCardBody>
                                </MDBCard>   
                            </Link>    
                        </Col>
                    </Row>
                    
                </Container>
                
            ))}
        </div>
    );
}
 
export default Home;
