import React from "react";

const Login = () => {
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/auth/twitter/reverse");
      const data = await response.json();

      if (data.url) {
        // Redirect the user to the Twitter authorization page
        window.location.href = data.url;
      } else {
        console.error("Failed to fetch Twitter authorization URL");
      }
    } catch (error) {
      console.error("Error fetching Twitter authorization URL:", error);
    }
  };

  return (
    <div className="login-page">
      <h1>Welcome to UNICRYPTO</h1>
      <button onClick={handleLogin} className="twitter-login-button">
        Login with Twitter
      </button>
    </div>
  );
};

export default Login;
