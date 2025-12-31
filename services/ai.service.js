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
    console.log('Gemini API response:', JSON.stringify(data).substring(0, 200));
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
