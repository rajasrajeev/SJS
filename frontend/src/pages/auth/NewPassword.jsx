import React, { useEffect, useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import LoginTextInput from '../../components/form/LoginTextInput';
import FormButton from '../../components/form/FormButton';
import FormPrevButton from '../../components/form/FormPrevButton';
import check from '../../assets/icons/check.png';
import PasswordStrength from '../../components/form/PasswordStrength';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, resetPassword } from '../../features/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const NewPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { otp } = location.state || '';
    const dispatch = useDispatch();
    const { resetId, loading, authError, resetSuccess } = useSelector((store) => store.auth);
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [p1Error, setP1Error] = useState("");
    const [p2Error, setP2Error] = useState("");

    useEffect(() => {
      if (resetSuccess) {
          navigate("/reset-success");
      }

      return () => {
        dispatch(clearState());
      }
    }, [resetSuccess]);

    useEffect(() => {
      return () => {
        dispatch(clearState());
      }
    }, []);

    const cancel = (e) => {
      e.preventDefault();
      navigate('/');
    }

    const handleChange1 = (e) => {
      setPassword1(e.target.value);
    }

    const handleChange2 = (e) => {
      setPassword2(e.target.value);
    }

    const onSubmit = (e) => {
      e.preventDefault();
      let isValid = true;

      if(!password1.trim()) {
        setP1Error("Password is required");
        isValid = false;
      } else if (password1.length < 5) {
        setP1Error("Atlease 5 characters required");
        isValid = false;
      } else {
        setP2Error("");
        isValid = true;
      }

      if (!password2.trim()) {
        setP2Error("Password is required");
        isValid = false;
      }else if(password1 !== password2) {
        setP2Error("Both password must be same");
        isValid = false;
      } else {
        setP2Error("");
        isValid = true
      }

      if(isValid) {
        dispatch(resetPassword({
          id: resetId,
          password: password1,
          otp: otp
        }));  
      } else {
        console.log("invalid");
      }

    }

    return (
      <Container className="login-form" style={{ paddingTop: '5%' }}>
        <div className="mb-4">
          <p className='signin-title'>Reset your new password</p>
          <div className="d-flex align-items-center">
            <p className="pb-3 new-here">Enter the new password</p>
          </div>
        </div>
        {authError && <div className="alert alert-danger" role="alert">
          {authError}
        </div>}
        <Form>
          <Form.Group className="mb-3">
            <LoginTextInput 
              label="New Password" 
              name="password1" 
              type="password"
              value={password1}
              handleChange={handleChange1}
              error={p1Error}
            />
          </Form.Group>
          <PasswordStrength length={password1.length}/>
          <br/><br/>
          <Form.Group className="mb-3">
              <LoginTextInput 
                label="Confirm Password" 
                name="password2" 
                type="password"
                value={password2}
                handleChange={handleChange2}
                error={p2Error}
              />
          </Form.Group>
          <br/>
          <Row>
              <Col>
                  <div className="d-flex justify-content-start">
                      <FormPrevButton 
                        label="Cancel" 
                        textColor="#F64E60"
                        color="#FFEBE8"
                        handleClick={cancel}
                      />
                  </div>
              </Col>
              <Col>
                  <div className="d-flex justify-content-end">
                      <FormButton 
                        label="Finish" 
                        style={{
                          backgroundColor: "var(--primary-color)",
                          color: "var(--ac-font-color)"
                        }}
                        icon={check}
                        handleClick={onSubmit}
                        loading={loading}
                      />
                  </div>
              </Col>
          </Row>
        </Form>
      </Container>
    )
}

export default NewPassword