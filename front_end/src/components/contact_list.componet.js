import axios from "axios";
import { useEffect, useState } from "react";
import {Button, Form, Table, ListGroup, Badge } from "react-bootstrap";
import {Search, Telephone, Trash} from 'react-bootstrap-icons';
import { Link } from "react-router-dom";

export default function ContactList(){
    const [contacts, setContacts] = useState([])

    useEffect(()=>{
        axios
            .get('http://localhost:8080/contacts/')
            .then((res)=>{console.log(res);
            setContacts(res.data);
            })
            .catch((err)=>console.log(err))
    }, []);

    const deleteContact = (id)=>{
        console.log(id);
        axios
            .delete(`http://localhost:8080/contacts/delete/${id}`)
            .then(res=>console.log(res))
            .catch(err=>console.log(err));
        window.location.reload();
    }

    return(
        <ListGroup as="ol">
            <Form>
                <Form.Group className="mb-3" controlId="search">
                    <div>
                        <Form.Control type="email" placeholder="Search contact by last name" /> 
                    </div>                     
                </Form.Group>
            </Form>
            {
                contacts && contacts.map((contact)=>(
                    <ListGroup.Item key={contact._id} as="li" className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <Link to={`/edit/${contact._id}`} style={{ textDecoration: 'none', color:'black' }}><div className="fw-bold">{contact.first_name} {contact.last_name}</div></Link><Telephone/>
                            {contact.phone}
                        </div>
                        <Button onClick={()=>deleteContact(contact._id)} style={{background:"red"}}>
                            <Trash color="white" size={20} />
                        </Button>
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    );
}