import React, { useEffect } from "react";
import TwitterLogin from "react-twitter-auth";

const Login = () => {
  useEffect(() => {
    // Parse oauth_token and oauth_verifier from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const oauthToken = urlParams.get("oauth_token");
    const oauthVerifier = urlParams.get("oauth_verifier");

    if (oauthToken && oauthVerifier) {
      // Send oauth_token and oauth_verifier to the backend for final login
      fetch(`http://localhost:4000/api/v1/auth/twitter?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Access Token:", data.accessToken);
          localStorage.setItem("twitterToken", data.accessToken);
          window.location.href = "/dashboard";
        })
        .catch((error) => console.error("Error during Twitter authentication:", error));
    }
  }, []);

  const onFailure = (error) => {
    console.error("Twitter Authentication Failed:", error);
  };

  return (
    <div className="login-page">
      <h1>Welcome to UNICRYPTO</h1>
      <TwitterLogin
        loginUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
        onFailure={onFailure}
        onSuccess={(response) => console.log("Redirecting...")}
        requestTokenUrl="http://localhost:4000/api/v1/auth/twitter/reverse"
      />
    </div>
  );
};

export default Login;
