import React from 'react';
import TwitterLogin from 'react-twitter-auth';

const TwitterLoginButton = () => {
  const onSuccess = (response) => {
    response.json().then((body) => {
      console.log('Login Success:', body);
      // Handle the user data, such as redirecting to a dashboard
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
      requestTokenUrl="http://localhost:4000/api/v1/auth/twitter"
      showIcon
    >
      <button className="twitter-login-btn">Login with Twitter</button>
    </TwitterLogin>
  );
};

export default TwitterLoginButton;
