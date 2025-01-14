import React, { useEffect } from "react";

const Callback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const oauthToken = urlParams.get("oauth_token");
    const oauthVerifier = urlParams.get("oauth_verifier");

    if (oauthToken && oauthVerifier) {
      // Send oauth_token and oauth_verifier to the backend
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

  return <div>Redirecting...</div>;
};

export default Callback;
