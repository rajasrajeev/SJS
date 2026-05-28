import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { Image, Row, Col } from 'react-bootstrap';
import loginImage from "../assets/login_side_pic.png";

const AuthLayout = () => {
  const userId = JSON.parse(localStorage.getItem("user_id"));
  const notAuth = isNaN(parseInt(userId));

  return (
    notAuth ?
      <div style={{ backgroundColor: "#FFF" }}>
        <Row>
          <Col
            md={4}
            sm={12}
            className="login-banner">
            <div className="text-center login-content">
              <div className="pt-4">
                <p className="welcome-text">Welcome to</p>
              </div>
              <Image
                src="https://www.freelogodesign.org/assets/img/logo-colors-meanings/logos-blancs/logo-fld04.svg"
                width={200}
              />
              <div className="p-4 d-none d-md-block">
                <p className="welcome-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui aperiam placeat
                </p>
              </div>
            </div>

          </Col>
          <Col
            md={8}
            sm={12}
            className="d-flex flex-column justify-content-center"
          >
            <Outlet />
          </Col>
        </Row>
      </div> : <Navigate to="/firm-dashboard" />
  )
}

export default AuthLayout


