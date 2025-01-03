import { gaianetConfig } from './config'
import type { GenerationOptions, ImageGenerationResponse } from './types'

export const generateImage = async (options: GenerationOptions): Promise<ImageGenerationResponse> => {
  try {
    const response = await fetch(`${gaianetConfig.baseURL}/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${gaianetConfig.apiKey}`
      },
      body: JSON.stringify({
        model: "portrait",
        prompt: options.prompt,
        n: 1,
        size: `${options.width || 512}x${options.height || 512}`,
        response_format: "url",
        negative_prompt: options.negativePrompt
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return {
      url: data.data[0].url || '',
      status: 'success'
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate image';
    console.error('Image generation error:', error);
    return {
      url: '',
      status: 'error',
      message: errorMessage
    }
  }
}