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
const BlogList = ({data_blog}) => {

    return ( 
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
    );
}
export default BlogList;

  