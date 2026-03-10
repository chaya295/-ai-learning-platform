import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private openai: OpenAI;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }
    
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateLesson(category: string, subCategory: string, prompt: string): Promise<string> {
    if (!prompt?.trim()) {
      throw new BadRequestException('Prompt cannot be empty');
    }

    try {
      this.logger.log(`Generating lesson for ${category} - ${subCategory}`);
      
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert teacher in ${category}, specifically ${subCategory}. Provide clear, educational, and engaging lessons. Format your response in a structured way with examples when appropriate.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      const response = completion.choices[0]?.message?.content;
      
      if (!response) {
        throw new Error('No response generated from AI');
      }

      return response;
    } catch (error) {
      this.logger.error(`OpenAI API Error: ${error.message}`, error.stack);
      
      if (error.response?.status === 401) {
        throw new Error('Invalid OpenAI API key');
      }
      
      if (error.response?.status === 429) {
        throw new Error('OpenAI rate limit exceeded. Please try again later.');
      }
      
      throw new Error(`Failed to generate lesson: ${error.message}`);
    }
  }
}
