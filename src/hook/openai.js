// src/hooks/useOpenAI.js
import { useState } from "react";

export function useOpenAI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateRecipe = async (imageFile, filters = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Convert the uploaded image to Base64
      const base64Image = await toBase64(imageFile);

      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          input: [
            {
              role: "user",
              content: [
                {
                  type: "input_text",
                  text: `Describe a recipe based on this image and filters. Include instructions, ingredients, and filters: ${JSON.stringify(filters)}`,
                },
                {
                  type: "input_image",
                  image_url: base64Image,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      // You can inspect the result structure here
      console.log("AI response:", data);

      const resultText =
        data?.output?.[0]?.content?.[0]?.text ||
        "No description returned by AI.";

      return resultText;
    } catch (err) {
      console.error("Error calling OpenAI API:", err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { generateRecipe, loading, error };
}

// Helper: convert image to Base64 for OpenAI input
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
