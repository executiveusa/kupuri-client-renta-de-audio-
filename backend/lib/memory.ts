// backend/lib/memory.ts
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export interface StoredMemory {
  timestamp: string;
  eventType?: string;
  needs?: string;
  message?: string;
  response?: string;
  proposal?: Record<string, unknown>;
}

export class MemoryStore {
  /**
   * Store conversation/proposal data for a client
   */
  async store(email: string, data: StoredMemory): Promise<void> {
    try {
      const key = `client:${email}`;
      const existing = await redis.get(key);
      
      let history: StoredMemory[] = [];
      if (existing && Array.isArray(existing)) {
        history = existing;
      }
      
      history.push(data);
      
      // Keep last 50 interactions
      if (history.length > 50) {
        history = history.slice(-50);
      }
      
      await redis.set(key, history, { ex: 7776000 }); // 90 days
    } catch (error) {
      console.error('Memory store error:', error);
      throw new Error('Failed to store memory');
    }
  }

  /**
   * Retrieve conversation history for a client
   */
  async retrieve(email: string): Promise<StoredMemory[] | null> {
    try {
      const key = `client:${email}`;
      const data = await redis.get(key);
      
      if (!data) return null;
      
      return Array.isArray(data) ? data : [data as StoredMemory];
    } catch (error) {
      console.error('Memory retrieve error:', error);
      return null;
    }
  }

  /**
   * Clear history for a client
   */
  async clear(email: string): Promise<void> {
    try {
      const key = `client:${email}`;
      await redis.del(key);
    } catch (error) {
      console.error('Memory clear error:', error);
    }
  }

  /**
   * Get summary of client interactions
   */
  async getSummary(email: string): Promise<{
    firstContact: string | null;
    lastContact: string | null;
    interactionCount: number;
    eventTypes: string[];
  }> {
    try {
      const history = await this.retrieve(email);
      
      if (!history || history.length === 0) {
        return {
          firstContact: null,
          lastContact: null,
          interactionCount: 0,
          eventTypes: [],
        };
      }

      const eventTypes = Array.from(
        new Set(history.map((h) => h.eventType).filter(Boolean))
      );

      return {
        firstContact: history[0].timestamp,
        lastContact: history[history.length - 1].timestamp,
        interactionCount: history.length,
        eventTypes: eventTypes as string[],
      };
    } catch (error) {
      console.error('Memory summary error:', error);
      return {
        firstContact: null,
        lastContact: null,
        interactionCount: 0,
        eventTypes: [],
      };
    }
  }
}

export default MemoryStore;
