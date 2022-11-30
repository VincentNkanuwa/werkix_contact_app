import {BrowserRouter as Router, Link, Navigate, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditContact from './components/edit_contact.component';
import ContactList from './components/contact_list.componet';
import CreateContact from './components/create_contact.component';
import { Button } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <div className='container'>
        <nav className='navbar navbar-expand-lg navbar-light bg-light '>
          <Link to={'/'} className='navbar-brand me-auto'>Contacts</Link>
          <div className='navbar-collapse" id="navbarNav'>
            <ul className='navbar-nav'>
              <li className='navbar-item'>
                <Link to={'/create'}>
                  <Button variant='primary' className='nav-link'><b>+Add Contact</b></Button>
                </Link>
              </li>
            </ul>
          </div>
        </nav>        
        <Routes>
          <Route path='/' exact element ={<ContactList/>}/>
          <Route path='/edit/:id' exact element ={<EditContact/>}/>
          <Route path='/create' exact element ={<CreateContact/>}/>
        </Routes>        
      </div>
    </Router>
    
  );
}

export default App;
