import { openai } from '../config/gaianet';
import type { GenerationOptions, ImageGenerationResponse } from '../types';

export const generateImage = async (options: GenerationOptions): Promise<ImageGenerationResponse> => {
  try {
    const response = await openai.images.generate({
      model: "portrait",
      prompt: options.prompt,
      n: 1,
      size: `512x512`,
      response_format: "url",
      // negative_prompt: options.negativePrompt
    });

    return {
      url: response.data[0].url || '',
      status: 'success'
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate image';
    console.error('Image generation error:', error);
    return {
      url: '',
      status: 'error',
      message: errorMessage
    };
  }
};