import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const Home = () => {
  const [auth, setAuth] = useState(false)
  const [message, setMessage] = useState('')
  const [name,setName] = useState('')
  axios.defaults.withCredentials = true;
  const navigate = useNavigate()

  useEffect(()=>{
    axios.get('http://localhost:8080')
    .then(res=>{
      console.log(res)
      if(res.data.Status === "Success"){
        setAuth(true)
        setName(res.data.name)
        navigate('/')
      }else{
        setAuth(false)
        setMessage(res.data.Error)
      }
    })
    .then(err=>console.log(err))
  },[])
  const handleLogout = ()=>{
    axios.get('http://localhost:8080/logout')
    .then(res=>{
      window.location.reload(true)
    })
    .catch(err => console.log(err))

  }
  return (
    <div className='container mt-4'>
      {
        auth ?
          <div>
            <h3>You are authorized {name}</h3>
            <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
          </div>
          :
          <div>
            <h3>{message}</h3>
            <h3>Login Now</h3>
            <Link to="/login" className='btn btn-primary'>Login</Link>
          </div>
      }
    </div>
  )
}
