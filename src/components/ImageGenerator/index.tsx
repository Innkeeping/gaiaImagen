import { ImageIcon, Loader2, Wand2 } from 'lucide-react'
import { useState } from 'react'
import { generateImage } from './api'

interface ImageGenerationResponse {
  url: string;
}

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [result, setResult] = useState<ImageGenerationResponse | null>(null)
  const [error, setError] = useState<string | null>('An unexpected error occurred')
  const [isLoading, setIsLoading] = useState(false)

  const inputId = Math.random().toString(36).substr(2, 9)

  async function handleSubmit() {
    setIsLoading(true)
    setError(null)

    try {
      const response = await generateImage({
        prompt,
        negativePrompt,
        steps: 30,
        width: 512,
        height: 512,
      });

      if (response.status === 'error') {
        setError(response.message || 'Failed to generate image');
      } else {
        setResult(response)
      }
    } catch (err) {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y8">
      <div className="text">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <Wand2 className="h-8 w-8" />
          AI Image Generator
        </h1>
        <p className="mt-2 text-gray-600">Using</p>
        <a href="https://.gaianet.ai/user-guide/nodes?_highlight=image#text-to-image-realistic-vision">
          GaiaNet
        </a>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor={`prompt-${inputId}`}>Prompt</label>
          <textarea
            id={`prompt-${inputId}`}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm min-h-[100px]"
            placeholder="Describe the image you want to generate..."
            required
          />
        </div>

        <div>
          <label htmlFor={`negativePrompt-${inputId}`}>Negative Prompt (Optional)</label>
          <textarea
            id={`negativePrompt-${inputId}`}
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Describe what you don't want in the image..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-ind-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Generating...
            </>
          ) : (
            <>
              <ImageIcon className="-ml-1 mr-2 h-4 w-4" />
              Generate Image
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {result && result.url && (
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Generated Image</h2>
          <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-square">
            <img src={result.url} alt="Generated" className="w-full h-full object-cover" />
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageGenerator