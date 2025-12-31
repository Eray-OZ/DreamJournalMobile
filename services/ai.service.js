const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// Get API key from Expo constants
const getApiKey = () => {
  const key = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  console.log('Gemini API Key exists:', !!key);
  return key;
};

// Localized prompts for dream analysis
const prompts = {
  analysis: {
    tr: (content) => `Bu rüyanın sembolik ve psikolojik analizini yap, cevap olarak sadece rüya analizini dön herhangi bir soru sorma, girdi olarak verilen rüya anlamsızsa, random harflerden ya da sayılardan oluşuyorsa cevap olarak 'Analiz Yapılamadı' cevabını dön, cevapta alt başlıklar olmasın sadece paragraf yaz : ${content}`,
    en: (content) => `Perform a symbolic and psychological analysis of this dream. Return only the dream analysis without asking any questions. If the input is meaningless or consists of random letters or numbers, return 'Analysis Failed'. Write in paragraphs without subheadings: ${content}`,
  },
  fallback: {
    tr: 'Analiz yapılamadı',
    en: 'Analysis could not be performed',
  },
};

// Analyze dream using Gemini API
export const analyzeDream = async (dreamContent, language = 'tr') => {
  const apiKey = getApiKey();
  
  console.log('Starting dream analysis...');
  
  if (!apiKey) {
    console.error('Gemini API key not found!');
    return { analysis: null, error: 'Gemini API key not configured' };
  }

  const lang = language === 'tr' ? 'tr' : 'en';
  const prompt = prompts.analysis[lang](dreamContent);

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      }),
    });

    console.log('Gemini API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    // console.log('Gemini API response:', JSON.stringify(data).substring(0, 200));
    let analysis = data.candidates?.[0]?.content?.parts?.[0]?.text || prompts.fallback[lang];
    
    // Clean up the response - keep letters from both languages
    analysis = analysis.replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ\s.,!?-]/g, '');

    const failedAnalysis = lang === 'tr' ? 'Analiz Yapılamadı' : 'Analysis Failed';
    if (analysis.trim() === failedAnalysis) {
      return { analysis: null, error: 'Invalid dream content' };
    }

    return { analysis, error: null };
  } catch (error) {
    return { analysis: null, error: error.message };
  }
};

import { InferenceClient } from "@huggingface/inference";

const getHfToken = () => {
    return process.env.EXPO_PUBLIC_HF_TOKEN;
}

// Direct fetch implementation to bypass SDK issues in React Native
export const generateDreamImage = async (dreamContent) => {
    // Pollinations doesn't need a token, but we check env just in case we switch back later or use it for logging
    // const token = getHfToken(); 
    
    try {
        console.log("Generating dream image via direct fetch...");
        const prompt = `Dreamy, surreal, artistic interpretation of: ${dreamContent.substring(0, 300)}`;
        
        // Switching to Pollinations.ai - Guaranteed free, no-key-required generation
        // This bypasses HF API issues completely
        const encodedPrompt = encodeURIComponent(prompt);
        const response = await fetch(
            `https://image.pollinations.ai/prompt/${encodedPrompt}`,
            {
                method: "GET",
            }
        );

        if (!response.ok) {
             const errorText = await response.text();
             console.error("HF API Error:", response.status, errorText);
             throw new Error(`API Error: ${response.status}`);
        }

        const blob = await response.blob();
        
        // Convert Blob to Base64
        const reader = new FileReader();
        return new Promise((resolve) => {
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve({ image: base64data, error: null });
            };
            reader.onerror = () => {
                resolve({ image: null, error: "Failed to process image data" });
            };
            reader.readAsDataURL(blob);
        });

    } catch (error) {
        console.error("Image Gen Error:", error);
        return { image: null, error: error.message || "Failed to generate image" };
    }
};
