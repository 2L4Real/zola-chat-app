import { GoogleGenerativeAI } from "@google/generative-ai";

// Đây là file xử lý backend của ứng dụng.
// Nó sẽ nhận yêu cầu từ ứng dụng web của chúng ta,
// gọi đến Gemini API và trả về kết quả.

// Export một hàm mặc định để Vercel có thể chạy nó như một serverless function.
export default async function (request, response) {
    try {
        // Lấy payload (nội dung tin nhắn) từ yêu cầu của người dùng.
        const payload = await request.json();

        // Lấy API Key từ biến môi trường của Vercel một cách an toàn.
        // Đây là cách duy nhất để giữ bí mật API Key.
        const apiKey = process.env.GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);

        // Lấy mô hình Gemini mà chúng ta sẽ sử dụng.
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // Gửi nội dung tin nhắn và system prompt đến Gemini.
        const result = await model.generateContent({
            contents: payload.contents,
            systemInstruction: payload.systemInstruction
        });

        // Lấy câu trả lời từ phản hồi của Gemini.
        const apiResponse = await result.response;
        const text = apiResponse.text();

        // Trả về câu trả lời cho ứng dụng web dưới dạng JSON.
        response.status(200).json({ text: text });
        
    } catch (error) {
        // Xử lý lỗi nếu có và gửi thông báo lỗi cho người dùng.
        console.error('Lỗi khi gọi API Gemini:', error);
        response.status(500).json({ error: "Lỗi nội bộ server." });
    }
}
