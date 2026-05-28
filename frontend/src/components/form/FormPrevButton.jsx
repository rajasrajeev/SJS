import React from 'react'

const FormPrevButton = ({label, color, icon, handleClick, textColor}) => {
  return (
    <button 
      className='form-btn' 
      style={{backgroundColor: color, color: textColor}}
      onClick={handleClick}
    >
      {icon && <img style={{marginRight:"8px"}} src={icon} width={18} height={18} alt=""/>}
      {label}
    </button>
  )
}

export default FormPrevButton