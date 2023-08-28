import { useState } from "react"
import { Link,useNavigate } from "react-router-dom"
import axios from 'axios'

export const Login = () => {
    const [values,setValue] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSumbit = (event)=>{
        event.preventDefault()
        axios.post('http://localhost:8080/login',values)
        .then(res=>{
            if(res.data.Status === 'Success'){
                navigate('/')
            }else{
                alert(res.data.Error)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-In</h2>
                <form onSubmit={handleSumbit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Enter Email" name="email" className="form-control rounded-0" onChange={ e=> setValue({...values,email:e.target.value})}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder="Enter Password" name="email" className="form-control rounded-0" onChange={ e=> setValue({...values,password:e.target.value})}/>
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
                    <p>You are agree to our terms and policies</p>
                    <Link to='/register'className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Register Page</Link>
                </form>
            </div>
        </div>
    )
}
