// backend/api/forms/submit.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { generateProposal } from '@/lib/claude';
import { EventFormData } from '@/types';
import { z } from 'zod';

// Validation schema
const FormDataSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  eventType: z.enum(['fiesta', 'concierto', 'corporativo', 'otro']),
  needs: z.string().min(10),
  guestCount: z.number().optional(),
  location: z.string().optional(),
  date: z.string().optional(),
  phone: z.string().optional(),
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    // Validate request body
    const data = FormDataSchema.parse(req.body);

    console.log(`Processing form submission from ${data.email}...`);

    // Generate proposal via Claude
    const proposal = await generateProposal(data);

    // Send confirmation email (future: integrate with SendGrid)
    console.log(`Proposal generated for ${data.name}:`, proposal.id);

    // Return success response
    return res.status(200).json({
      success: true,
      data: proposal,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Form submission error:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid form data',
        details: error.errors,
        timestamp: new Date().toISOString(),
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to process form submission',
      timestamp: new Date().toISOString(),
    });
  }
}
