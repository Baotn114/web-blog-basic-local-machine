import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const BlogList = ({data_blog}) => {

    return ( 
        <Container className='custom-Home'>
            <Row>
                <Col>
                    <Link to={`/blogs/${data_blog._id}`}>
                        <h2>{data_blog.title}</h2>
                        <label>Author: {data_blog.author} </label>    
                    </Link>    
                </Col>
            </Row>
        </Container>
    );
}
export default BlogList;

  