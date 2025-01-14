import React from 'react';
import TwitterLogin from 'react-twitter-auth';

const TwitterAuth = () => {
  const onSuccess = (response) => {
    response.json().then((user) => {
      console.log('Twitter Auth Success:', user);
    });
  };

  const onFailure = (error) => {
    console.error('Twitter Auth Failed:', error);
  };

  return (
    <TwitterLogin
      loginUrl="http://localhost:4000/api/v1/auth/twitter"
      onFailure={onFailure}
      onSuccess={onSuccess}
      requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
    />
  );
};

export default TwitterAuth;
