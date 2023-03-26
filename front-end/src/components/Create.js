import React from "react";
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { MDBInput } from 'mdb-react-ui-kit';
import { MDBTextArea } from 'mdb-react-ui-kit';
import { useAuthContext } from "../hooks/useAuthContext"

const Create = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const {user} = useAuthContext();

    const convertToBase64 = (e)=>{
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () =>{
            setImage(fileReader.result);
        }
    }

    const handleSubmit = async () =>{
        if(!user){
            navigate('/sign-in')
        }

        const blog = {title, author, content, image};
        console.log(title);
        await fetch("/api/routes/create", {
                method: "POST",
                body: JSON.stringify(blog),
                headers: {
                    "Content-type" : "application/json",
                    "Authorization" : `Bearer ${user.token}`
                }
        })
        //const json = await response.json();
        //console.log(json)
        navigate('/')
    }



    return ( 
        <div className='custom-blogs'>
            <h2 className='header'>Tell Your Story</h2>
            {image && (<img src={image} className='img-fluid shadow-4' alt="header" style={{marginBottom: "10px"}}/>)}
            <MDBInput placeholder="Your Title" type='text' style={{marginBottom: '10px'}}
                value={title} required onChange={(event) => setTitle(event.target.value)}
            />
            <MDBInput placeholder="Your Name"  type='text' style={{marginBottom: '10px'}}
                value={author} required onChange={(event)=> setAuthor(event.target.value)}
            />
            <MDBTextArea placeholder="Your Story" type='text' style={{marginBottom: '10px'}} rows={4} 
                value={content} required onChange={(event) => setContent(event.target.value)}
            />
            <MDBInput type='file' style={{marginBottom: '10px'}} onChange={convertToBase64}/>
            <Button variant="primary" className='custom-btn' onClick={handleSubmit}>Submit</Button>{' '}
        </div>
    );
}
 
export default Create;