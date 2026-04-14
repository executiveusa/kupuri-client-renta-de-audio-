// backend/api/webhooks/telegram.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { continueConversation } from '@/lib/claude';
import { MemoryStore } from '@/lib/memory';
import https from 'https';

const memory = new MemoryStore();

// Telegram bot token
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

async function sendTelegramMessage(chatId: string, text: string) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    });

    const options = {
      hostname: 'api.telegram.org',
      path: `/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        resolve(JSON.parse(body));
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message || !message.text) {
      return res.status(200).json({ ok: true });
    }

    const chatId = message.chat.id;
    const userId = message.from.id;
    const userText = message.text;

    // Get AI response
    const response = await continueConversation(
      `telegram_${userId}`,
      userText
    );

    // Send response
    await sendTelegramMessage(chatId, response);

    // Store interaction
    await memory.store(`telegram_${userId}`, {
      timestamp: new Date().toISOString(),
      message: userText,
      response,
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Telegram error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
}
