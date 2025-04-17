import { useState } from "react";
import { fetchLlamaResponse } from "./api";
import "./ChatAssistant.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // 백엔드에 Bible verse 데이터와 함께 요청을 보내고, 챗봇의 응답을 받음
      const response = await fetchLlamaResponse(input);

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Error fetching assistant response:", err);
      const assistantMessage: Message = {
        role: "assistant",
        content: "답변을 불러오지 못했습니다.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${
              msg.role === "user" ? "user" : "assistant"
            }`}
          >
            <div className="bubble">{msg.content}</div>
          </div>
        ))}
        {loading && (
          <div className="chat-message assistant">
            <div className="bubble">⏳ 응답 생성 중...</div>
          </div>
        )}
      </div>

      <div className="chat-input-area">
        <textarea
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder="질문을 입력하세요..."
        />
        <button onClick={sendMessage} disabled={loading}>
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
