// backend/lib/claude.ts
import Anthropic from '@anthropic-ai/sdk';
import { MemoryStore } from './memory';

export interface ProposalRequest {
  name: string;
  email: string;
  eventType: 'fiesta' | 'concierto' | 'corporativo' | 'otro';
  needs: string;
  guestCount?: number;
  location?: string;
  date?: string;
}

export interface Proposal {
  id: string;
  clientName: string;
  eventType: string;
  tiers: {
    social: {
      name: string;
      description: string;
      specs: string[];
      priceRange: string;
      leadTime: string;
    };
    escenico: {
      name: string;
      description: string;
      specs: string[];
      priceRange: string;
      leadTime: string;
    };
    corporativo: {
      name: string;
      description: string;
      specs: string[];
      priceRange: string;
      leadTime: string;
    };
  };
  nextSteps: string[];
  timestamp: string;
}

const client = new Anthropic();
const memory = new MemoryStore();

export async function generateProposal(request: ProposalRequest): Promise<Proposal> {
  const conversationId = `${request.email}-${Date.now()}`;

  // Retrieve prior conversation context if exists
  const priorContext = await memory.retrieve(request.email);
  const memoryContext = priorContext
    ? `Previous interactions:\n${priorContext.join('\n')}\n\n`
    : '';

  const systemPrompt = `You are DOS2A's proposal specialist. You generate detailed, tiered proposals for events.
DOS2A provides: Audio profesional, Iluminación escénica, Producción audiovisual, Operación técnica.

Available tiers:
- Social (bodas, fiestas): $800-2000 USD, 2-week lead time
- Escénico (conciertos, shows): $3000-8000 USD, 4-week lead time
- Corporativo (conferencias, activaciones): $2000-5000 USD, 2-3 weeks lead time

Always provide:
1. Specific audio recommendations
2. Lighting design suggestions
3. Production approach
4. Operations plan
5. Next steps for booking

Be conversational, professional, and specific to their event needs.`;

  const userPrompt = `Client inquiry:
Name: ${request.name}
Email: ${request.email}
Event Type: ${request.eventType}
Guest Count: ${request.guestCount || 'Not specified'}
Location: ${request.location || 'Not specified'}
Date: ${request.date || 'Not specified'}
Needs: ${request.needs}

${memoryContext}

Generate a tiered proposal (Social, Escénico, Corporativo) with specific recommendations for this event. 
Format as JSON with this structure:
{
  "tiers": {
    "social": { "name": "...", "description": "...", "specs": [...], "priceRange": "...", "leadTime": "..." },
    "escenico": { ... },
    "corporativo": { ... }
  },
  "nextSteps": ["step1", "step2", "step3"],
  "reasoning": "why these tiers fit their needs"
}`;

  try {
    const response = await client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    // Parse Claude's JSON response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse Claude response');
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Store in memory for future conversations
    await memory.store(request.email, {
      timestamp: new Date().toISOString(),
      eventType: request.eventType,
      needs: request.needs,
      proposal: parsed,
    });

    // Build proposal object
    const proposal: Proposal = {
      id: conversationId,
      clientName: request.name,
      eventType: request.eventType,
      tiers: parsed.tiers,
      nextSteps: parsed.nextSteps || [
        'Review proposal options',
        'Schedule a call to discuss details',
        'Finalize booking and deposit',
      ],
      timestamp: new Date().toISOString(),
    };

    return proposal;
  } catch (error) {
    console.error('Claude API error:', error);
    throw new Error('Failed to generate proposal');
  }
}

export async function continueConversation(
  email: string,
  message: string
): Promise<string> {
  const priorContext = await memory.retrieve(email);

  const response = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 800,
    system: `You are DOS2A's WhatsApp assistant. You help qualify leads and answer questions about our services.
Be friendly, concise, professional. Respond in the same language the client used (Spanish or English).
Keep responses to 1-2 short paragraphs max for mobile readability.`,
    messages: [
      {
        role: 'user',
        content: `Client message: "${message}"`,
      },
    ],
  });

  const responseContent = response.content[0];
  if (responseContent.type !== 'text') {
    throw new Error('Unexpected response type');
  }

  // Store this interaction
  if (priorContext) {
    await memory.store(email, {
      timestamp: new Date().toISOString(),
      message,
      response: responseContent.text,
    });
  }

  return responseContent.text;
}
