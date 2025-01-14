import React, { useState } from 'react';
import TwitterLogin from 'react-twitter-auth';

const TwitterAuth = () => {
  const [authData, setAuthData] = useState(null);

  // This is where the success or failure data will be stored.
  const onSuccess = (response) => {
    // Handle response data from successful authentication.
    response.json().then((data) => {
      setAuthData(data); // Store authentication data (e.g., tokens)
      console.log(data);
      // Optionally, you can save the token in localStorage or sessionStorage
    });
  };

  const onFailure = (error) => {
    console.error('Twitter authentication failed:', error);
  };

  return (
    <div>
      <h2>Login with Twitter</h2>
      <TwitterLogin
        loginUrl="http://localhost:4000/api/v1/auth/twitter" // Change this URL to your backend API endpoint
        onFailure={onFailure}
        onSuccess={onSuccess}
        requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse" // Change this to your backend's reverse URL
        showIcon={true}
      />
      {authData && (
        <div>
          <h3>Authentication Successful!</h3>
          <pre>{JSON.stringify(authData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TwitterAuth;
