import React from 'react'


const FormButton = ({label, style, icon, handleClick, loading}) => {
  return (
    <button 
      className='form-btn' 
      style={style}
      onClick={handleClick}
      disabled={loading ? true : false}
    >
      {loading ? "Loading" : label}
      {icon && <img style={{marginLeft:"8px"}} src={icon} width={18} height={18} alt=""/>}
    </button>
  )
}

export default FormButton