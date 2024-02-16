import React from 'react';
import loginImg from '../../../assets/icons/loginLogo.png';
import './forgotPassword.scss';
import '../auth.scss';

/**
 * 
 * @returns forgot password html section
 */
const ForgotPasswordPage = () => {
  return (
    <div className="App">
      <div className="login">
        <div className="container">
          <div className="base-container">
            <div className="header">FORGOT PASSWORD</div>
            <div className="content">
              <div className="image">
                <img src={loginImg} alt={'logo'} />
              </div>
              <div className="form">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" placeholder="Enter Email ID..." />
                </div>
                <div className="form-group">
                  <label htmlFor="password">New Password</label>
                  <input type="text" name="password" placeholder="Enter Password..." />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Re-enter New Password</label>
                  <input type="text" name="password" placeholder="Re-enter Password..." />
                </div>
              </div>
            </div>
            <div className="footer">
              <button type="button" className="btn">
                BACK TO LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
