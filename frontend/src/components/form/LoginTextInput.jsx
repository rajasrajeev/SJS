import React from 'react'
import './style.scss'


const LoginTextInput = ({label, name, type, error, handleChange}) => {
  return (
    <div className='login-input-wrapper'>
      <p className='ip-label'>{label}</p>
      <input type={type} name={name} onChange={handleChange} style={{backgroundColor: "#eee"}}/>
      <small style={{color: "red"}}>{error}</small>
    </div>
  )
}

export default LoginTextInput