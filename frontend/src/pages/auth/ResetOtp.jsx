import React, { useEffect, useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import LoginTextInput from '../../components/form/LoginTextInput';
import FormButton from '../../components/form/FormButton';
import arrowright from '../../assets/icons/Arrow-right.png';
import adminprev from '../../assets/icons/arrow-left.png';
import FormPrevButton from '../../components/form/FormPrevButton';
import { useDispatch, useSelector } from 'react-redux';
import { clearState, forgotPassword, verifyOTP } from '../../features/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';


const ResetOtp = () => {
    const location = useLocation();
    const { email } = location.state || '';
    const navigate = useNavigate();
    const { loading, otpSuccess, authError, emailSuccess } = useSelector((store) => store.auth);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
      if(otpSuccess) {
        navigate("/reset-password", {state: {otp}});
      }
    }, [otpSuccess]);

    useEffect(() => {
      return () => {
        dispatch(clearState());
      }
    }, []);

    const handleChange = (e) => {
      setOtp(e.target.value);
    }

    const gotoPrev = (e) => {
      e.preventDefault();
      navigate(-1);
    }

    const onSubmit = (e) => {
      e.preventDefault();
      if(!otp.trim()) {
        setOtpError("Otp is required")
      } else {
        setOtpError("");
        dispatch(verifyOTP({
          otp: otp,
          email: email
        }));
      }
    }

    return (
      <Container className="login-form" style={{ paddingTop: '5%' }}>
        <div className="mb-4">
          <p className='signin-title'>Verify OTP</p>
          <div className="d-flex align-items-center">
            <p className="pb-3 new-here">Enter the OTP that we sent to</p>
            <p className="pb-3 px-2 new-here-link" style={{color: "var(--parimary-color)"}}>{ email }</p>
          </div>
        </div>
        {authError && <div className="alert alert-danger" role="alert">
          {authError}
        </div>}
        {emailSuccess && <div className="alert alert-success" role="alert">
          New OTP send
        </div>}
        <Form>
          <Form.Group className="mb-3">
            <LoginTextInput 
              label="OTP" 
              name="otp"
              type="text"
              value={otp}
              error={otpError}
              handleChange={handleChange}
              style={{ width: '100%' }}
            />
          </Form.Group>
          <Row>
              <Col>
                  <div className="d-flex justify-content-start">
                      <FormPrevButton 
                        label="Previous" 
                        textColor={"var(--parimary-color)"}
                        color="#eee" 
                        icon={adminprev}
                        handleClick={gotoPrev}
                      />
                  </div>
              </Col>
              <Col>
                  <div className="d-flex justify-content-end">
                      <FormButton 
                        label="Next"
                        style={{
                          backgroundColor: "var(--primary-color)",
                          color: "var(--ac-font-color)"
                        }}
                        icon={arrowright}
                        loading={loading}
                        handleClick={onSubmit}
                      />
                  </div>
              </Col>
          </Row>
          
        </Form>
      </Container>
    )
}

export default ResetOtp