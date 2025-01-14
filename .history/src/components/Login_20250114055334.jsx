import React from "react";
import TwitterLogin from "react-twitter-auth";

const Login = () => {
  const onSuccess = (response) => {
    response.json().then((body) => {
      console.log("Access Token:", body.oauth_token);
      // Save token and redirect to dashboard
      localStorage.setItem("twitterToken", body.oauth_token);
      window.location.href = "/dashboard";
    });
  };

  const onFailure = (error) => {
    console.error("Twitter Authentication Failed:", error);
  };

  return (
    <div className="login-page">
      <h1>Welcome to UNICRYPTO</h1>
      <TwitterLogin
        loginUrl="http://localhost:4000/api/v1/auth/twitter"
        onFailure={onFailure}
        onSuccess={onSuccess}
        requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
      />
    </div>
  );
};

export default Login;
