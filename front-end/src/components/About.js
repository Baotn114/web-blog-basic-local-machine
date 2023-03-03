import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const About = () => {
    return ( 
        <Container className='custom-Home'>
        <Row>
            <Col>
                <p>This is my basic blog website that I made to practice coding Reactjs framework and also to know more about MERN Stack (mongoDb - Express - Reactjs - Nodejs) when I'm creating this blog website.
                    Although this website has a lot of defects such as realtime comment, avatar user display or get a picture from your local machine and post with your blogs,... I'm still able to improve it in the near
                    future when I know more about MERN and accumulate enough coding experiences. That's all :D. I can make this project thanks to a youtube channel named "Net-Ninja", he helps me a lot in authentication process and teaches me
                    how to use "useContext" in react js for authenticating people to access some components which are for only users have registered on this website.
                </p>
            </Col>
        </Row>
    </Container>
    );
}
 
export default About;