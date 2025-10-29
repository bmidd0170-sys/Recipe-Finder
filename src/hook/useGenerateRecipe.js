import { useMutation } from "@tanstack/react-query";

export function useGenerateRecipe() {
  return useMutation({
    mutationFn: async ({ file, filters }) => {
      try {
        // convert file to base64
        function toBase64(file) {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              // Get only the base64 part of the data URL
              const base64String = reader.result.split(',')[1];
              resolve(base64String);
            };
            reader.onerror = (e) => reject(e);
          });
        }

        console.log('Starting file conversion...');
        const base64Image = await toBase64(file);
        console.log('File converted successfully');

        const apiUrl = 'https://api.openai.com/v1/chat/completions';
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

        if (!apiKey) {
          throw new Error('OpenAI API key is not configured');
        }

        console.log('Sending request to OpenAI...');
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: `Generate a detailed recipe for ${filters.recipeName || 'the dish'} shown in this image. Include:
1. A list of all required ingredients with measurements
2. Step-by-step cooking instructions
3. Cooking time and difficulty level
4. Tips for best results
${JSON.stringify(filters)}`
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: `data:image/jpeg;base64,${base64Image}`
                    }
                  }
                ]
              }
            ],
            max_tokens: 1000
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('OpenAI API Error:', errorData);
          throw new Error(errorData.error?.message || `API Error: ${response.status} ${response.statusText}`);
        }

        console.log('Response received from OpenAI');
        const data = await response.json();
        const resultText = data.choices?.[0]?.message?.content;
        
        if (!resultText) {
          throw new Error('No valid response content from OpenAI');
        }

        return resultText;
      } catch (error) {
        console.error('Recipe generation error:', error);
        throw new Error(error.message || 'Failed to generate recipe');
      }
    }
  });
}
