import { GoogleGenerativeAI } from "@google/generative-ai";

export default async (request, response) => {
    try {
        const payload = await request.json();
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });

        const result = await model.generateContent({
            contents: payload.contents,
            systemInstruction: payload.systemInstruction
        });

        const apiResponse = await result.response;
        response.status(200).json({ text: apiResponse.text() });
    } catch (error) {
        console.error('Lỗi khi gọi API Gemini:', error);
        response.status(500).json({ error: "Lỗi nội bộ server." });
    }
};
