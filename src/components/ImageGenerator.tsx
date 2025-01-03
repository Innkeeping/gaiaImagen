import React, { useState } from 'react'
import { Wand2, Image as ImageIcon, Loader2 } from 'lucide-react'
import { generateImage } from '../services/api'
import type { ImageGenerationResponse } from '../types'

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState('')
  const [negativePrompt, setNegativePrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<ImageGenerationResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await generateImage({
        prompt,
        negativePrompt,
        steps: 30,
        width: 512,
        height: 512,
      })

      if (response.status === 'error') {
        setError(response.message || 'Failed to generate image')
      } else {
        setResult(response)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <Wand2 className="h-8 w-8" />
          AI Image Generator
        </h1>
        <p className="mt-2 text-gray-600">Transform your ideas into stunning images with AI</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
            Prompt
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm min-h-[100px]"
            placeholder="Describe the image you want to generate..."
            required
          />
        </div>

        <div>
          <label htmlFor="negativePrompt" className="block text-sm font-medium text-gray-700">
            Negative Prompt (Optional)
          </label>
          <textarea
            id="negativePrompt"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Describe what you don't want in the image..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
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

      {result?.url && (
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Generated Image</h2>
          <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-square">
            <img
              src={result.url}
              alt="Generated"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  )
}