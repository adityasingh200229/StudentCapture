import React ,{ useState }from 'react'
import { useHistory } from 'react-router-dom'
const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""})

  let history = useHistory();

const handleSubmit= async (e)=>{
  e.preventDefault();
  const {name, email, password}= credentials;
  const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({name, email, password})
    });
    const json = await response.json()
    console.log(json);
    if(json.success){
      // save token and redirect
      localStorage.setItem('token',json.authtoken)
      history.push("/")
      props.showAlert("Account created successfully","success")
    }
    else{
      props.showAlert("email already registered or invalid details","danger")
    }
}
const onChange=(e)=>{
  setCredentials({...credentials,[e.target.name]:e.target.value})
}

  return (
    <div className='container my-3'>
            <form className="notes" onSubmit={handleSubmit}>
                <div className="notes mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control"  name="name" id="name" onChange={onChange} aria-describedby="emailHelp" />
                    
                </div>
                
                <div className="notes mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control"  name="email" id="email" onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="email form-text">We'll never share your email with anyone else.</div>
                </div>
                
                <div className="notes mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onChange}minLength={5} required />
                </div>
                
                <div className="notes mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange}minLength={5} required />
                </div>
                <button type="submit" className="formButtonn btn btn-primary" >Sign Up</button>
            </form>
        </div>
  )
}

export default Signup
