const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/sendOtp', async (req, res) => {
  const { otp, twitterHandle } = req.body;

  try {
    const twitterBearerToken = process.env.VITE_TWITTER_BEARER_TOKEN;
    const twitterApiUrl = `https://api.twitter.com/2/direct_messages/events/new.json`;

    const payload = {
      event: {
        type: 'message_create',
        message_create: {
          target: {
            recipient_id: twitterHandle,
          },
          message_data: {
            text: `Your OTP is: ${otp}`,
          },
        },
      },
    };

    const response = await axios.post(twitterApiUrl, payload, {
      headers: {
        Authorization: `Bearer ${twitterBearerToken}`,
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json({ message: 'OTP sent successfully', response: response.data });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
