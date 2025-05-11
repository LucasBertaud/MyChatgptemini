import { Injectable } from '@nestjs/common';
import { AiPort } from '../../../domain/ai/ai.port';
import { GoogleGenAI } from '@google/genai';
import { AI_INSTRUCTIONS } from '../../../shared/constants/ai-instructions.constants';

@Injectable()
export class GeminiAdapter implements AiPort {
  private ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  public async generateResponse(prompt: string): Promise<string> {
    const result = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        systemInstruction: AI_INSTRUCTIONS.GENERATE_RESPONSE,
      },
    });
    const response = result.text.trim();

    return response;
  }

  public async generateTitle(prompt: string): Promise<string> {
    const result = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        systemInstruction: AI_INSTRUCTIONS.GENERATE_TITLE,
      },
    });
    const response = result.text.trim();
    return response;
  }
}
