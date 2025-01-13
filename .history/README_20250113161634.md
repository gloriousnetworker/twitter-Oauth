Twitter [X] Authentication and OTP Verification App

This is a React-based application that integrates with the Twitter API to provide user authentication, OTP generation and verification, and a secure dashboard. The app leverages OAuth 2.0 for authentication and Twitter Direct Messages API to send OTPs.

Features:
1. Twitter Authentication: Secure login using Twitter's OAuth.

2. OTP Generation and Verification: Generates a 6-digit OTP and sends it via Twitter Direct Messages.

3. Dashboard: Accessible upon successful OTP verification.

Prerequisites:
1. A Twitter Developer Account.
2. API keys from the Twitter Developer Portal.

Setup Instructions:
1. Clone the Repository:


git clone https://github.com/gloriousnetworker/twitter-Oauth-App.git

cd your-repo-name
2. Install Dependencies:

npm install
3. Set Up Environment Variables:

Create a .env file in the root of the project:

REACT_APP_API_KEY=your-api-key
REACT_APP_API_SECRET_KEY=your-api-secret-key
REACT_APP_BEARER_TOKEN=your-bearer-token
REACT_APP_ACCESS_TOKEN=your-access-token
REACT_APP_ACCESS_TOKEN_SECRET=your-access-token-secret

Replace placeholders with your Twitter API credentials.

4. Run the Application Locally:
npm run dev
Open http://localhost:3000 to view it in your browser.

Deployment:
The application is deployed on Vercel. Access it here: https://twitter-oauth-app-wheat.vercel.app/

Technologies Used:
ReactJs + Vite: Frontend framework.
Twitter API: For authentication and Direct Messages.
Axios: For making API requests.
dotenv: For environment variable management.
React Router: For navigation.
