export interface AiPort {
  generateResponse(prompt: string): Promise<string>;
  generateTitle(prompt: string): Promise<string>;
}
