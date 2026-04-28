const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

app.post('/chat', async (req, res) => {
  const { message } = req.body;
  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    system: `You are a friendly assistant for Titan TRT Clinic in Avon Park, FL. 
    You help men learn about testosterone replacement therapy, medical weight loss, 
    ED treatment, and growth hormone treatment. Always be encouraging and supportive. 
    For appointments or urgent questions, direct them to call (941) 405-3005 or visit 
    www.titantrtclinic.com/appointments. Never give specific medical advice.`,
    messages: [{ role: 'user', content: message }]
  });
  res.json({ reply: response.content[0].text });
});

app.listen(3000, () => console.log('Titan TRT Chatbot running!'));
