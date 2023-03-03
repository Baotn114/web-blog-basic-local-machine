import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
const Navigationbar = () => {
    const {logout} = useLogout();
    const {user} = useAuthContext();
    const navigate = useNavigate();
    const handleClick= () =>{
        logout();
        navigate("/");
    }

    return ( 
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Tommy's Blog</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    {user && (<Nav.Link href="/Create">New Blog</Nav.Link>)}
                    {!user && <Nav.Link href="/sign-in">Sign in</Nav.Link>}
                    {!user && <Nav.Link href="/sign-up">Sign up</Nav.Link>}
                    {user && <Nav.Link> Hello {user.email}</Nav.Link>}
                    {user && (<button onClick={handleClick}>Log out</button>)}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
 
export default Navigationbar;
