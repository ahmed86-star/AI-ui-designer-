import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key",
});

export interface GenerateUIOptions {
  prompt: string;
  model: "gpt-4o" | "gpt-3.5-turbo";
  responsive: boolean;
}

export async function generateUI(options: GenerateUIOptions): Promise<string> {
  const { prompt, model, responsive } = options;

  const systemPrompt = `You are an expert frontend developer specializing in modern web design and Tailwind CSS.

Your task is to generate clean, production-ready HTML code based on user descriptions. Follow these guidelines:

1. Use only HTML and Tailwind CSS classes
2. Make the design modern, clean, and professional
3. ${responsive ? "Ensure the design is fully responsive using Tailwind's responsive prefixes" : "Focus on desktop layout"}
4. Use semantic HTML elements
5. Include proper accessibility attributes
6. Use a consistent color palette and spacing
7. Return ONLY the HTML content that goes inside the <body> tag
8. Do not include <html>, <head>, or <body> tags
9. Do not include any <script> tags or JavaScript
10. Use Tailwind's utility classes extensively
11. Make sure all interactive elements have proper hover states
12. Use appropriate spacing, typography, and layout classes

The generated HTML should be immediately usable and look professional.`;

  const userPrompt = `Create a web interface based on this description: ${prompt}

Make it visually appealing, modern, and follow current web design best practices.`;

  try {
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const generatedHTML = response.choices[0].message.content;
    
    if (!generatedHTML) {
      throw new Error("No content generated from OpenAI");
    }

    return generatedHTML.trim();
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error(`Failed to generate UI: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function validateAPIKey(): Promise<boolean> {
  try {
    await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "test" }],
      max_tokens: 1,
    });
    return true;
  } catch {
    return false;
  }
}
