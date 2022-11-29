import { useState } from "react"

export default function CreateContact(){
    const [contact, setContact] = useState({
        first_name:'',
        last_name:'',
        phone:''
    })
    return(
        <div style={{marginTop: 20}}>
            <h3>Contact create</h3>
                <form>
                    <div className="form-group">
                        <label for="exampleInputEmail1">First Name</label>
                        <input value={contact.first_name} name="first_name" type="text" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Last Name</label>
                        <input value={contact.last_name} name="last_name" type="text" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Phone Number</label>
                        <input value={contact.phone} name="phone" type="text" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
        </div>
    )
}