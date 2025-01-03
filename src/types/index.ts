export interface ImageGenerationResponse {
  url: string;
  status: 'success' | 'error';
  message?: string;
}

export interface GenerationOptions {
  prompt: string;
  negativePrompt?: string;
  steps?: number;
  width?: number;
  height?: number;
}