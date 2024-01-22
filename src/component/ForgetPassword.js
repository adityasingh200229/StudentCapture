import React, { useState } from 'react'
import Alert from './Alert'

const ForgetPassword = (props) => {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const sendLink = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/auth/sendpasswordlink`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        const json = await response.json()
      console.log(json);
      if(json.success){
        // save token and redirect
            setEmail("");
            setMessage(true);
            console.log(email)
      }
      else{
        props.showAlert("email or password is incorrect","danger")
      }
        // const data = await response.json()
        // if (data.status == 201) {
        //     setEmail("");
        //     setMessage(true);
        //     console.log(email)
        // }
        // else{
        //     props.showAlert("Enter a valid email","danger")
        // }
    }

    const onChange = (e) => {
        setEmail(e.target.value)
    }
    return (
        <>
            <div className='container my-3'>
                <form className="form" onSubmit={sendLink}>
                    <div className="notes mb-3">
                        <label htmlFor="email" className="form-label"><h2>Enter your Email address to change your password</h2></label>
                        <input type="email" className="form-control" value={email} name="email" id="email" onChange={onChange} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="email form-text">We'll never share your email with anyone else.
                        </div>
                    </div>
                    {message ? <p>password verification link sent successfully in your email</p>:""}
                    <button type="submit" className="formButtonn btn btn-primary">Send verification email</button>

                </form>
            </div>
        </>
    )
}

export default ForgetPassword
