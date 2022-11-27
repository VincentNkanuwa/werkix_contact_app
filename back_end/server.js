const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const routes = express.Router();
const PORT = 8000;

let Contact = require('./Models/contacts');


mongoose.connect('mongodb://127.0.0.1:27017/werkix');

db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected to Mongoose")
});

app.use(cors());
app.use(bodyParser.json);

routes.route('/').get((req, res)=>{
  Contact.find((err, contacts)=>{
    if(err){
      console.log(err);
    }else{
      res.json(contacts)
    }
  })
})

routes.route('/:id').get((req, res)=>{
  let id = req.params.id;
  Contact.findById(id, (err, contact)=>{
    if(err){
      console.log(err);
    }else{
      res.json(contact);
    }
  })
})

route.route('/create').post((req, res)=>{
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

app.use('/contacts', routes);

app.listen(PORT, ()=>{
    console.log('Server started on port: ' +PORT);
})