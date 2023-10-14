import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Joi from 'joi'
export default function Register() {

  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
  })
  let navigate = useNavigate()
  let [errorApi, setErrorApi] = useState("")
  let [errorList, setErrorList] = useState([])
  let [loading, setloading] = useState(false)
  function addUser(e) {
    let myUser = { ...user }
    myUser[e.target.name] = e.target.value
    setUser(myUser)
  }


  async function submitForm(e) {
    e.preventDefault()
    let valid = ValidData()
    console.log(valid);
    if (valid.error == null) {
      setloading(true)
      console.log(user);
      let { data } = await axios.post('https://movies-api.routemisr.com/signup', user)
      console.log(data);

      setloading(false)
      if (data.message == 'success') {
        // login
        navigate('/login')
      }
      else {
        // error
        setErrorApi(data.message)
      }
    } else {
      // error valid
      setErrorList(valid.error.details)
    }

  }

  function ValidData() {


    let schama = Joi.object({
      first_name: Joi.string().required().min(3).max(20).alphanum(),
      last_name: Joi.string().required().min(3).max(20).alphanum(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(new RegExp(/^[A-Z][a-z]{2,10}[0-9]?$/))
    })

    return schama.validate(user, { abortEarly: false })
  }
  return (
    <div>

      <h2>Registeration Form</h2>

      {errorApi == '' ? '' : <div className='alert alert-danger '>{errorApi}</div>}


      {errorList.length > 0 ? errorList.map((el) => <div className='text-danger'>{el.path[0] == 'password' ? 'enter vaild pass' : el.message}</div>) : ""}
      <form onSubmit={submitForm}   >

        <div className='my-3'>

          <label htmlFor="first_name">first name</label>
          <input onChange={addUser} type="text" id='first_name' name='first_name' className='form-control bg-transparent text-white mt-2' />
        </div>
        <div className='my-3'>

          <label htmlFor="last_name">last name</label>
          <input onChange={addUser} type="text" id='last_name' name='last_name' className='form-control bg-transparent text-white mt-2' />
        </div>
        <div className='my-3'>

          <label htmlFor="age">age</label>
          <input onChange={addUser} type="number" id='age' name='age' className='form-control bg-transparent text-white mt-2' />
        </div>
        <div className='my-3'>

          <label htmlFor="email">email</label>
          <input onChange={addUser} type="email" id='email' name='email' className='form-control bg-transparent text-white mt-2' />
        </div>
        <div className='my-3'>

          <label htmlFor="password">password</label>
          <input onChange={addUser} type="password" id='password' name='password' className='form-control bg-transparent text-white mt-2' />
        </div>
        {loading ? <button type='button' className='btn btn-outline-info'>
          <i className='fa-solid fa-spinner fa-spin'></i>
        </button> : <button type='submit' className='btn btn-outline-info'>Register</button>}



      </form>
    </div>
  )
}


