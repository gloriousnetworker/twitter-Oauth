import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { otp, twitterHandle } = req.body;

    try {
      const twitterBearerToken = process.env.VITE_TWITTER_BEARER_TOKEN; // Store securely in .env
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
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
