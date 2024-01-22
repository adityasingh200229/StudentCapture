import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Alert from './Alert'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"", password:""})

    let history = useHistory();

const handleSubmit= async (e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({email: credentials.email, password: credentials.password})
      });
      const json = await response.json()
      console.log(json);
      if(json.success){
        // save token and redirect
        localStorage.setItem('token',json.authtoken)
        props.showAlert("Login successfully","success")
        history.push("/")
      }
      else{
        props.showAlert("email or password is incorrect","danger")
      }
}
const onChange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
}

    return (
        <div className='container my-3'>
            <form className="form" onSubmit={handleSubmit}>
                <div className="notes mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} name="email" id="email" onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="email form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="notes mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"value={credentials.password} name="password" id="password" onChange={onChange} />
                </div>
                <button type="submit" className="formButtonn btn btn-primary" >Login</button>
            </form>
        </div>
    )
}

export default Login
