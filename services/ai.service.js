const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// Get API key from Expo constants
const getApiKey = () => {
  const key = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  console.log('Gemini API Key exists:', !!key);
  return key;
};

// Analyze dream using Gemini API
export const analyzeDream = async (dreamContent) => {
  const apiKey = getApiKey();
  
  console.log('Starting dream analysis...');
  
  if (!apiKey) {
    console.error('Gemini API key not found!');
    return { analysis: null, error: 'Gemini API key not configured' };
  }

  const prompt = `Bu rüyanın sembolik ve psikolojik analizini yap, cevap olarak sadece rüya analizini dön herhangi bir soru sorma, girdi olarak verilen rüya anlamsızsa, random harflerden ya da sayılardan oluşuyorsa cevap olarak 'Analiz Yapılamadı' cevabını dön, cevapta alt başlıklar olmasın sadece paragraf yaz : ${dreamContent}`;

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
    let analysis = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Analiz yapılamadı';
    
    // Clean up the response
    analysis = analysis.replace(/[^a-zA-Z0-9çğıöşüÇĞİÖŞÜ\s.,!?-]/g, '');

    if (analysis.trim() === 'Analiz Yapılamadı') {
      return { analysis: null, error: 'Invalid dream content' };
    }

    return { analysis, error: null };
  } catch (error) {
    return { analysis: null, error: error.message };
  }
};

// Categorize dream using Gemini API
export const categorizeDream = async (dreamContent) => {
  const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    return { category: 'Diğer', error: 'Gemini API key not configured' };
  }

  const prompt = `Bu rüyanın aşağıdaki kategorilerden hangisine ait olduğunu belirt ve cevap olarak sadece bu seçeneklerden birini dön, açıklama yazma: Korku, İlişki, İş, Aile, Geçmiş, Gelecek, Diğer. : ${dreamContent}`;

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

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const category = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Diğer';

    // Validate category
    const validCategories = ['Korku', 'İlişki', 'İş', 'Aile', 'Geçmiş', 'Gelecek', 'Diğer'];
    if (!validCategories.includes(category)) {
      return { category: 'Diğer', error: null };
    }

    return { category, error: null };
  } catch (error) {
    return { category: 'Diğer', error: error.message };
  }
};

// Combined function to analyze and categorize a dream
export const processNewDream = async (dreamContent) => {
  try {
    // Run analysis and categorization in parallel
    const [analysisResult, categoryResult] = await Promise.all([
      analyzeDream(dreamContent),
      categorizeDream(dreamContent),
    ]);

    return {
      analysis: analysisResult.analysis || 'Analiz yapılamadı',
      category: categoryResult.category || 'Diğer',
      error: analysisResult.error || categoryResult.error,
    };
  } catch (error) {
    return {
      analysis: 'Analiz yapılamadı',
      category: 'Diğer',
      error: error.message,
    };
  }
};
