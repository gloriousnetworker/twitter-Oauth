import React from "react";
import axios from "axios";

const Login = () => {
  const handleTwitterLogin = async () => {
    try {
      const response = await axios.get("http://localhost:5173/oauth/request_token");
      const { oauth_token } = response.data;
      const twitterAuthURL = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;
      window.location.href = twitterAuthURL;
    } catch (error) {
      console.error("Error during Twitter login:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Login with Twitter</h1>
      <button
        onClick={handleTwitterLogin}
        className="bg-blue-500 text-white px-6 py-3 rounded shadow"
      >
        Login with Twitter
      </button>
    </div>
  );
};

export default Login;
