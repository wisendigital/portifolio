import { GoogleGenAI } from "@google/genai";

// Initialize the client
// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
// Assume this variable is pre-configured, valid, and accessible.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateProjectDescription = async (title: string, category: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Atue como um especialista em Marketing Digital Sênior.
      Escreva uma descrição curta, profissional e persuasiva (máximo 30 palavras) para um projeto de portfólio.
      
      Título do Projeto: ${title}
      Categoria: ${category}
      
      A descrição deve focar em resultados e impacto.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Descrição indisponível no momento.";
  } catch (error) {
    console.error("Erro ao gerar descrição com Gemini:", error);
    return "Não foi possível gerar a descrição automática. Por favor, insira manualmente.";
  }
};