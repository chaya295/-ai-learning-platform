import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'mock-key',
    });
  }

  async generateLesson(category: string, subCategory: string, prompt: string): Promise<string> {
    if (!process.env.OPENAI_API_KEY) {
      this.logger.warn('OPENAI_API_KEY not configured, using mock response');
      return `Mock lesson: ${prompt} in ${category} - ${subCategory}. Configure OPENAI_API_KEY for real AI responses.`;
    }

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert teacher in ${category}, specifically ${subCategory}. Provide clear, educational, and engaging lessons.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || 'Unable to generate lesson.';
    } catch (error) {
      this.logger.error('OpenAI API Error:', error.message);
      return `Mock lesson: ${prompt} in ${category} - ${subCategory}. OpenAI API error occurred.`;
    }
  }
}
