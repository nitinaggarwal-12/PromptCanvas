import { GoogleGenAI } from '@google/genai';

const MODELS_TO_TEST = [
  'gemini-2.5-flash',
  'gemini-1.5-flash',
  'gemini-2.0-flash',
  'gemini-2.0-flash-exp'
];

async function testGeminiModels() {
  console.log('Testing Google Gen AI SDK connection with various models...');
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  for (const model of MODELS_TO_TEST) {
    console.log(`\nTrying model: ${model}...`);
    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: 'Hello! Respond with a single short sentence confirming you can hear me.',
      });
      
      console.log(`✅ Success with model: ${model}!`);
      console.log('Response:', response.text);
      console.log(`\n🎉 The active model we should use is: "${model}"`);
      return; // Stop on first success!
    } catch (error: any) {
      console.error(`❌ Failed with model: ${model}`);
      console.error('Error message:', error.message || error);
    }
  }
  
  console.error('\n❌ All models failed to connect. Please check your API key or network.');
}

testGeminiModels();
