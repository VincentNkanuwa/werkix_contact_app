import axios from "axios";
import { useEffect, useId, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function EditContact(){
    const navigate = useNavigate();
    const [updatedContact, setUpdatedContact] = useState({
        first_name:'',
        last_name:'',
        phone:''
    });

    let { id } = useParams();
    console.log(id);

    useEffect(()=>{
        axios
            .get(`http://localhost:8080/contacts/${id}`)
            .then((res)=>{console.log(res);
            setUpdatedContact(res.data);
            })
            .catch((err)=>console.log(err))
    }, []);

    // const updateContact = (contact)=>{
    //     console.log(contact);
    // }

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
        console.log(updatedContact);

        axios
            .post(`http://localhost:8080/contacts/update/${id}`, updatedContact)
            .then((res)=>console.log(res))
            .catch((err)=>console.log(err));

            navigate('/');
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