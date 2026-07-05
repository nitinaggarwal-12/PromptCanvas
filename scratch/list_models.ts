import { GoogleGenAI } from '@google/genai';

async function listModels() {
  console.log('Listing available Gemini models...');
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.list();
    console.log('\n✅ Available Models:');
    response.models?.forEach(model => {
      console.log(`- ${model.name} (supports: ${model.supportedGenerationMethods?.join(', ')})`);
    });
  } catch (error) {
    console.error('❌ Failed to list models:', error);
  }
}

listModels();
