import { GoogleGenerativeAI } from "@google/generative-ai";


export default async function (request, response) {
    try {
       
        const payload = await request.json();

      
        const apiKey = process.env.GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);

       
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

        
        const result = await model.generateContent({
            contents: payload.contents,
            systemInstruction: payload.systemInstruction
        });

       
        const apiResponse = await result.response;
        const text = apiResponse.text();

        
        response.status(200).json({ text: text });
        
    } catch (error) {
    
        console.error('Lỗi khi gọi API Gemini:', error);
        response.status(500).json({ error: "Lỗi nội bộ server." });
    }
}
