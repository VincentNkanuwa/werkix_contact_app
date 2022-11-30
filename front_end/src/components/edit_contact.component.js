import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { redirect } from "react-router-dom";

export default function EditContact(){
    // const [contact, setContact] = useState({
    //     first_name:'',
    //     last_name:'',
    //     phone:''
    // })

    const [updatedContact, setUpdatedContact] = useState({});

    const updateContact = (contact)=>{
        console.log(contact);
    }

    const handleChange = (event)=>{
        const {name, value} = event.target;

        setUpdatedContact((prev)=>{
            return{
                ...prev,
                [name] : value
            }
        })
    }
    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log(updateContact);

        axios
            .post('http://localhost:8080/contacts/create', updateContact``)
            .then((res)=>console.log(res))
            .catch((err)=>console.log(err));

            redirect('/');
    }

    return(
        <div>
            <h3>Contact Edit</h3>
            <div style={{marginTop: 20}}>
                <Form>
                    <Form.Group className="mb-3" controlId="first_name">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            onChange={handleChange}
                            name="first_name" 
                            value={updatedContact.first_name ? updatedContact.first_name: ""}  
                            type="text" 
                            placeholder="first name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="last_name">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            onChange={handleChange}
                            name="last_name" 
                            value={updatedContact.last_name ? updatedContact.last_name: ""}  
                            type="text" 
                            placeholder="last name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control 
                            onChange={handleChange}
                            name="phone" 
                            value={updatedContact.phone ? updatedContact.phone: ""}  
                            type="text" 
                            placeholder="phone" />
                    </Form.Group>
                    <Button
                        style={{width:'100%', marginTop:'1rem'}} 
                        onClick={handleSubmit} 
                        variant="primary">
                        Submit
                    </Button>
                </Form>
            </div>        
        </div>
    )
}