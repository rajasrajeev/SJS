import React, { useEffect, useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginTextInput from '../../components/form/LoginTextInput';
import FormButton from '../../components/form/FormButton';
import { emailValidation } from '../../utils/validators';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, clearState } from '../../features/authSlice';
import loginicon from '../../assets/icons/login-icon.png';

const PasswordResetEmail = () => {
    const { emailSuccess, authError, loading } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [emailError, setFormError] = useState('')
    const [email, setEmail] = useState('');

    useEffect(() => {
      if (emailSuccess) {
        navigate("/verify-otp");
      } 
    }, [emailSuccess]);

    useEffect(() => {
      return () => {
        dispatch(clearState());
      }
    }, []);

    const handleChange = (e) => {
      setEmail(e.target.value);
    } 

    const onSubmit = (e) => {
      e.preventDefault();
      const [flag, message] = emailValidation(email);

      if(!flag) {
        setFormError(message);
      } else {
        setFormError("");
        dispatch(forgotPassword({ email: email }));
      }
    }

    return (
      <Container className="login-form" style={{ paddingTop: '5%' }}>
        <div className="mb-4">
          <p className='signin-title'>Enter email to get Otp</p>
          {authError && <div className="alert alert-danger" role="alert">{authError}</div>}
        </div>
        <Form>
          <Form.Group className="mb-3">
            <LoginTextInput
              label="Email"
              name="email"
              type="email"
              value={email}
              handleChange={handleChange}
              error={emailError}
              style={{ width: '100%' }}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <FormButton
              label="Send email"
              icon={loginicon}
              handleClick={onSubmit}
              loading={loading}
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--ac-font-color)"
              }}
            />
          </div>
        </Form>
      </Container>
  )
}

export default PasswordResetEmail