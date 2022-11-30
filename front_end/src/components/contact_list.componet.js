import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button, Form, Table, ListGroup, Badge } from "react-bootstrap";
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
    return(
        <ListGroup as="ol">
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <div>
                        <Form.Control type="email" placeholder="Enter email" /> 
                    </div>                     
                </Form.Group>
            </Form>
            {
                contacts && contacts.map((contact)=>(
                    <ListGroup.Item key={contact._id} as="li" className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <Link style={{ textDecoration: 'none', color:'black' }}><div className="fw-bold">{contact.first_name} {contact.last_name}</div></Link><Telephone/>
                            {contact.phone}
                        </div>
                        <Badge bg="danger">
                            <Trash color="white" size={20} />
                        </Badge>
                    </ListGroup.Item>
                ))
            }
        </ListGroup>
    );
}