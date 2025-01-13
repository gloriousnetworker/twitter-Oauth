import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TwitterLogin from 'react-twitter-auth';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [error, setError] = useState('');
  const { login } = useAuth();
  const history = useHistory();

  const onSuccess = (response) => {
    response.json().then((data) => {
      const { oauth_token, oauth_token_secret } = data;
      login(oauth_token, oauth_token_secret);
      history.push('/otp'); // Redirect to OTP page after successful login
    });
  };

  const onFailed = (error) => {
    setError('Twitter Login failed. Please try again.');
  };

  return (
    <div>
      <h2>Login with Twitter</h2>
      {error && <p>{error}</p>}
      <TwitterLogin
        loginUrl="https://api.twitter.com/oauth/authenticate"
        onFailure={onFailed}
        onSuccess={onSuccess}
        requestTokenUrl="https://api.twitter.com/oauth/request_token"
        showIcon={true}
      />
    </div>
  );
};

export default Login;
