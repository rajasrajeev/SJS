import React, { useState } from 'react';
import { Image, Form, Container, Row, Col } from 'react-bootstrap';
import loginImage from "../../assets/login_side_pic.png";
import LoginTextInput from '../../components/form/LoginTextInput';
import FormButton from '../../components/form/FormButton';
import loginicon from '../../assets/icons/login-icon.png';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { emailValidation } from '../../utils/validators';


const Login = () => {
  const { authError = '', loading = false } = useSelector((store) => store.auth || {});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    name === "username" ? setUsername(e.target.value) : setPassword(e.target.value);
  };

  const validateFields = () => {
    let isValid = true;
    const [flag, message] = emailValidation(username);
    isValid = flag;

    if (!username.trim()) {
      setUsernameError("Please enter your username");
      isValid = false;
    } else if(!flag) {
      setUsernameError(message);
    }
    else {
      setUsernameError("");
    }

    if (!password.trim()) {
      setPasswordError("Please enter password");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
       dispatch(login({ 'email': username, 'password': password }));
     // navigate('/firm-dashboard'); 
    }
  };

  return (
    <Container className="login-form" style={{ paddingTop: '5%' }}>
      <div className="mb-4">
        <p className='signin-title'>Sign in to Accounting</p>
        {authError && <div className="alert alert-danger" role="alert">{authError}</div>}
      </div>
      <Form>
        <Form.Group className="mb-3">
          <LoginTextInput
            label="Email"
            name="username"
            type="email"
            value={username}
            handleChange={handleChange}
            error={usernameError}
            style={{ width: '100%' }} 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Row>
            <Col>
              <Form.Label className='ip-label' htmlFor="inputPassword5">Password</Form.Label>
            </Col>
            <Col className="text-end">
              <p onClick={() => navigate('/reset-password-email')} className='forgot-password' style={{ color: "var(--primary-color)" }}>Forget Password</p>
            </Col>
          </Row>
          <LoginTextInput
            label=""
            name="password"
            type="password"
            value={password}
            handleChange={handleChange}
            error={passwordError}
            style={{ width: '100%' }}
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <FormButton
            label="Sign In"
            icon={loginicon}
            handleClick={handleSubmit}
            loading={loading}
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--ac-font-color)"
            }}
          />
        </div>
      </Form>
    </Container>
  );
}

export default Login;
