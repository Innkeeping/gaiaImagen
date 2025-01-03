import OpenAI from 'openai';

export const gaianetConfig = {
  baseURL: 'https://portrait.gaia.domains/v1',
  apiKey: 'GAIA', // Can be empty or any value
};

export const openai = new OpenAI({
  baseURL: gaianetConfig.baseURL,
  apiKey: gaianetConfig.apiKey,
  dangerouslyAllowBrowser: true // Enable browser usage
});