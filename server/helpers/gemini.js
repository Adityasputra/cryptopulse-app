// gemini.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

const gemini = {
  getMarketPrice: async (input) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Provide the current market price for: ${input}, ambil dari berita terkini`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log("Market Price Response:", text);
      return text;
    } catch (error) {
      console.error("Error fetching market price:", error);
      throw new Error("Failed to fetch market price");
    }
  },

  getSuggestion: async (input) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Give a suggestion based on: ${input}`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log("Suggestion Response:", text);
      return text;
    } catch (error) {
      console.error("Error getting suggestion:", error);
      throw new Error("Failed to get suggestion");
    }
  },
};

module.exports = gemini;
