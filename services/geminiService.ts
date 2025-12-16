import { GoogleGenAI } from "@google/genai";
import { CartItem, Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Eres un asistente experto de cocina y compras para "MercadoFresco", una tienda de abarrotes en línea.
Tu objetivo es ayudar a los usuarios a planear comidas, sugerir recetas basadas en lo que tienen en su carrito, o recomendar productos que vendemos.
Siempre responde en español de manera amable, breve y útil.
Si sugieres una receta, lista los ingredientes brevemente.
Tienes acceso a la lista de productos disponibles en la tienda y al carrito actual del usuario.
Usa formato Markdown para que el texto se vea bien (negritas para ingredientes, listas para pasos).
`;

export const getChefAdvice = async (
  userQuery: string,
  cart: CartItem[],
  allProducts: Product[]
): Promise<string> => {
  try {
    const productList = allProducts.map(p => `${p.name} (${p.category})`).join(', ');
    const cartList = cart.length > 0 
      ? cart.map(c => `${c.quantity}x ${c.name}`).join(', ') 
      : "El carrito está vacío";

    const prompt = `
    Contexto de la Tienda:
    Productos disponibles: ${productList}
    
    Contexto del Usuario:
    Carrito actual: ${cartList}
    
    Pregunta del usuario: "${userQuery}"
    
    Responde basándote en los productos disponibles y lo que el usuario ya tiene.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    return response.text || "Lo siento, no pude generar una respuesta en este momento.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Tuve un problema conectando con el chef virtual. Por favor intenta de nuevo.";
  }
};