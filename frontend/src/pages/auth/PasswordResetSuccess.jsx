import React from 'react';
import { Container } from 'react-bootstrap';
import FormButton from '../../components/form/FormButton';
import loginicon from '../../assets/icons/login-icon.png';
import { useNavigate } from 'react-router-dom';

const PasswordResetSuccess = () => {
  const navigate = useNavigate();
  
  const gotoSignIn = (e) => {
    e.preventDefault();
      navigate("/");
  }

    return (
      <Container className="login-form" style={{ paddingTop: '5%' }}>
        <div className="mb-4" style={{textAlign: "center"}}>
          <p className='signin-title'>Password changed successfully</p>
          <div className="d-flex align-items-center">
            <p className="pb-3 new-here">Your password is successfully changed. Please Sign in to your account and start a new project</p>
          </div>
          <FormButton 
            label="Sign In" 
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--ac-font-color)"
            }}
            icon={loginicon}
            handleClick={gotoSignIn}
          />
        </div>
      </Container>
    )
}

export default PasswordResetSuccess