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
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


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
            ?   <Container className='custom-reload'>
                    <MDBSpinner grow className='mx-2' size="sm" color='info' >  
                    </MDBSpinner>
                    <MDBSpinner grow className='mx-2' size="sm" color='info'>
                    </MDBSpinner>  
                    <MDBSpinner grow className='mx-2' size="sm" color='info'>
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
                                        <MDBCardText><strong>Author: {data_blog.author}</strong></MDBCardText>
                                        <MDBCardText>{formatDistanceToNow(new Date(data_blog.createdAt), {addSuffix: true})}</MDBCardText>
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
