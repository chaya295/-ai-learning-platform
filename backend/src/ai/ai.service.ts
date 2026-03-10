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

  private formatOpenAiError(error: unknown) {
    const e: any = error;
    const message =
      (typeof e?.message === 'string' && e.message) ||
      (typeof e?.error?.message === 'string' && e.error.message) ||
      String(error);

    const status =
      (typeof e?.status === 'number' && e.status) ||
      (typeof e?.response?.status === 'number' && e.response.status) ||
      undefined;

    const code = typeof e?.code === 'string' ? e.code : undefined;
    const type = typeof e?.type === 'string' ? e.type : undefined;

    const requestId =
      (typeof e?.request_id === 'string' && e.request_id) ||
      (typeof e?.requestId === 'string' && e.requestId) ||
      (typeof e?.headers?.['x-request-id'] === 'string' && e.headers['x-request-id']) ||
      (typeof e?.response?.headers?.get === 'function' && e.response.headers.get('x-request-id')) ||
      undefined;

    const responseBody = e?.response?.data ?? e?.error ?? undefined;
    const stack = e instanceof Error ? e.stack : undefined;

    return { message, status, code, type, requestId, responseBody, stack };
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
      const info = this.formatOpenAiError(error);
      this.logger.error(
        `OpenAI API error (status=${info.status ?? 'unknown'} code=${info.code ?? 'unknown'} requestId=${info.requestId ?? 'unknown'}): ${info.message}`,
        info.stack,
      );
      if (info.responseBody) {
        try {
          this.logger.error(`OpenAI API response body: ${JSON.stringify(info.responseBody)}`);
        } catch {
          this.logger.error('OpenAI API response body: [unserializable]');
        }
      }

      // תמיד מחזירים את פרטי השגיאה למשתמש כדי שיהיה קל לדבג
      return `OpenAI API error: ${info.message} (status=${info.status ?? 'unknown'} code=${info.code ?? 'unknown'} requestId=${info.requestId ?? 'unknown'})`;
    }
  }
}
