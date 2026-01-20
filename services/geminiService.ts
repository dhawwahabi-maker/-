
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getExperimentInsight(experimentTitle: string, userNote: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am conducting a science experiment titled "${experimentTitle}". Here are my notes/observations: "${userNote}". Can you provide a very brief scientific insight or feedback in Arabic? Keep it encouraging for a student.`,
        config: {
          systemInstruction: "You are a friendly Arabic-speaking science teacher. Provide concise, encouraging feedback on student lab notes.",
          temperature: 0.7,
        },
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "عذراً، لم أتمكن من تحليل الملاحظات حالياً. استمر في اكتشافك الرائع!";
    }
  }

  async getMaterialRole(experimentTitle: string, materialName: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `In the context of the experiment "${experimentTitle}", what is the role of "${materialName}"? Provide a very short, simple, and scientific explanation in Arabic (one sentence).`,
        config: {
          systemInstruction: "You are a science lab assistant. Explain the role of a specific material in a given experiment simply and briefly in Arabic.",
          temperature: 0.5,
        },
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "هذا المكون أساسي لإنجاح التجربة وفهم التفاعل العلمي.";
    }
  }

  async getExperimentDataPoints(experimentTitle: string, stepDescription: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Based on the experiment "${experimentTitle}" and the current step "${stepDescription}", generate 5 realistic scientific data points (numbers) that could be plotted on a graph. For example, if it's about heat, return temperatures. If it's about motion, return speeds. Return only the numbers separated by commas.`,
        config: {
          systemInstruction: "You are a data simulator for science experiments. Return exactly 5 numbers separated by commas, representing relevant metrics for the given experiment step.",
          temperature: 0.4,
        },
      });
      const text = response.text || "10,20,30,40,50";
      return text.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    } catch (error) {
      console.error("Gemini Data Error:", error);
      return [10, 25, 45, 70, 95];
    }
  }
}

export const geminiService = new GeminiService();
