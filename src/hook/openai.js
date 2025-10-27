// src/hooks/useOpenAI.js
import { useMutation } from '@tanstack/react-query';

export function useOpenAI() {
  const mutation = useMutation({
    mutationFn: async ({ imageFile, filters = {} }) => {
      console.log("Generating recipe with filters:", filters);
      
      const base64Image = await toBase64(imageFile);
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Indentify the food in the image and describe a recipe based on it and the filters given. Include instructions, ingredients, and filters: ${JSON.stringify(filters)}`
                },
                {
                  type: "image_url",
                  image_url: base64Image
                }
              ]
            }
          ],
          max_tokens: 1000
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to generate recipe');
      }

      const data = await response.json();
      const resultText = data.choices?.[0]?.message?.content || "No description returned by AI.";
      return resultText;
    },
  });

  const generateRecipe = (imageFile, filters) => {
    return mutation.mutateAsync({ imageFile, filters });
  };

  return {
    generateRecipe,
    loading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    reset: mutation.reset,
  };
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
