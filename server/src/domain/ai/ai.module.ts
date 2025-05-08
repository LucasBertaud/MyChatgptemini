import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { INJECTION_TOKENS } from '../../shared/constants/injection-tokens.constants';
import { GeminiAdapter } from '../../infrastructure/ai/gemini/gemini.adapter';

@Module({
  providers: [
    AiService,
    {
      provide: INJECTION_TOKENS.AI_SERVICE,
      useClass: GeminiAdapter,
    },
  ],
  exports: [AiService],
})
export class AiModule {}
