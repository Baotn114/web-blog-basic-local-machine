import React from "react";
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { MDBInput } from 'mdb-react-ui-kit';
import { MDBTextArea } from 'mdb-react-ui-kit';
const Create = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async () =>{
        const blog = {title, author, content};
        console.log(title);
        const response = await fetch("/api/routes/create", {
                method: "POST",
                body: JSON.stringify(blog),
                headers: {"Content-type" : "application/json"}
        })
        const json = await response.json();
        console.log(json)
        navigate('/')
    }
    return ( 
        <div className='custom-blogs'>
            <h2 className='header'>Tell Your Story</h2>
            <MDBInput placeholder="Your Title" type='text' style={{marginBottom: '10px'}}
                value={title} required onChange={(event) => setTitle(event.target.value)}
            />
            <MDBInput placeholder="Your Name"  type='text' style={{marginBottom: '10px'}}
                value={author} required onChange={(event)=> setAuthor(event.target.value)}
            />
            <MDBTextArea placeholder="Your Story" type='text' style={{marginBottom: '10px'}} rows={4} 
                value={content} required onChange={(event) => setContent(event.target.value)}
            />
            <Button variant="primary" className='custom-btn' onClick={handleSubmit}>Submit</Button>{' '}
        </div>
    );
}
 
export default Create;