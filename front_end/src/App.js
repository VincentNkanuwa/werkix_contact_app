import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditContact from './components/edit_contact.component';
import ContactList from './components/contact_list.componet';
import CreateContact from './components/create_contact.component';

function App() {
  return (
    <Router>
      <div className='container'>
        <nav className='navbar navbar-expand-lg navbar-light bg-light '>
          <Link to={'/'} className='navbar-brand me-auto'>Contact App</Link>
          <div className='navbar-collapse" id="navbarNav'>
            <ul className='navbar-nav'>
              <li className='navbar-item'>
                <Link to={'/'} className='nav-link'>Contacts</Link>
              </li>
              <li className='navbar-item'>
                <Link to={'/create'} className='nav-link'>Add Contact</Link>
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
