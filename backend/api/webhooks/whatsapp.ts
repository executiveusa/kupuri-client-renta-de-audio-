// backend/api/webhooks/whatsapp.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { continueConversation } from '@/lib/claude';
import { MemoryStore } from '@/lib/memory';
import twilio from 'twilio';

const memory = new MemoryStore();

// Twilio credentials (from environment)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const whatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;

const client = twilio(accountSid, authToken);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only POST for incoming messages
  if (req.method === 'POST') {
    const { From, Body } = req.body;

    // Extract phone number (remove "whatsapp:" prefix)
    const phoneNumber = From.replace('whatsapp:', '');

    // Extract email from memory or use phone as fallback
    const conversation = await memory.retrieve(phoneNumber);
    const clientEmail = conversation?.[0]?.email || phoneNumber;

    try {
      // Get AI response
      const response = await continueConversation(clientEmail, Body);

      // Send response via WhatsApp
      await client.messages.create({
        from: `whatsapp:${whatsappNumber}`,
        to: From,
        body: response,
      });

      // Store interaction
      await memory.store(clientEmail, {
        timestamp: new Date().toISOString(),
        message: Body,
        response,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('WhatsApp error:', error);
      res.status(500).json({ error: 'Failed to process message' });
    }
  } else if (req.method === 'GET') {
    // Twilio webhook verification
    const { hub_challenge } = req.query;
    res.status(200).send(hub_challenge);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
