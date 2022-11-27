
const cors = require('cors');
const mongoose = require('mongoose');

const express = require('express');
const app = express();

const PORT = 8080;

let Contact = require('./Models/contacts');


mongoose.connect('mongodb://127.0.0.1:27017/werkix');

db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to Mongoose")
});


const bodyParser = require('body-parser');
const { find } = require('./Models/contacts');
const { findByIdAndDelete } = require('./Models/contacts');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

app.get('/contacts', async (req, res)=>{
  await Contact.find((err, contacts)=>{
    if(err){
      console.log(err);
    }else{
      res.json(contacts)
    }
  })
})

// Getting a single contact give id
app.get('/contacts/:id', async (req, res)=>{
  let id = req.params.id;
  await Contact.findById(id, (err, contact)=>{
    if(err){
      console.log(err);
    }else{
      res.json(contact); 
    }
  })
})

// Creating a contact
app.post('/contacts/create', (req, res)=>{
  if(!req.body.first_name){
    res.status(400).send({ message: "First Name can not be empty!" });
    return;
  }
  if(!req.body.last_name){
    res.status(400).send({ message: "Last Name can not be empty!" });
    return;
  }
  if(!req.body.phone){
    res.status(400).send({ message: "Phone can not be empty!" });
    return;
  }else{
    let contact = new Contact(req.body);
    contact
      .save()
      .then(contact=>{
        res.status(201).json({'contact' : 'Contact added successfully'});
      })
      .catch(err=>{
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      })

  }
})

// Updating a contact API
app.post('/contacts/update/:id', async(req, res)=>{
  await Contact.findById(req.params.id, (err, contact)=>{
    if(!contact){
      res.status(404).send('Contact not found');
    }else{
      contact.first_name = req.body.first_name;
      contact.last_name = req.body.last_name;
      contact.phone = req.body.phone;

      contact.save()
      .then(contact=>{
        res.json('Contact updated successfully');
      })
      .catch(err=>{
        res.status(400).send('Something happend. Try again');
      })
    }
  })
})

app.delete('/contacts/delete/:id', async(req, res)=>{
  await Contact.findByIdAndDelete(req.params.id, (err, contact)=>{
    if(!contact){
      res.status(404).send('Contact not found');
    }else{
      res.json('Contact deleted successfully');
    }
  })
})

app.listen(PORT, ()=>{
    console.log('Server started on port: ' +PORT);
});