import React from 'react';
import TwitterLogin from 'react-twitter-auth';

const TwitterLoginButton = () => {
  const onSuccess = (response) => {
    response.json().then((body) => {
      console.log('Login Success:', body);
      // Redirect to dashboard or handle user data
    });
  };

  const onFailed = (error) => {
    console.error('Login Failed:', error);
  };

  return (
    <TwitterLogin
      loginUrl="http://localhost:4000/api/v1/auth/twitter"
      onFailure={onFailed}
      onSuccess={onSuccess}
      requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
      showIcon
    >
      <button className="twitter-login-btn">Login with Twitter</button>
    </TwitterLogin>
  );
};

export default TwitterLoginButton;
