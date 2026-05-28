import React from 'react'

const PasswordStrength = ({length}) => {
  return (
    <div className='strength-wrapper'>
        <div className={length > 3 ? 'strength-bar strength-bar-active' : 'strength-bar strength-bar-normal'}></div>
        <div className={length > 5 ? 'strength-bar strength-bar-active' : 'strength-bar strength-bar-normal'}></div>
        <div className={length > 7 ? 'strength-bar strength-bar-active' : 'strength-bar strength-bar-normal'}></div>
        <div className={length > 9 ? 'strength-bar strength-bar-active' : 'strength-bar strength-bar-normal'}></div>
    </div>
  )
}

export default PasswordStrength