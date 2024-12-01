import ChatbotIcon from "./ChatbotIcon.jsx";
import ChatForm from "./ChatForm.jsx";
import ChatMessage from "./ChatMessage.jsx";
import { useState, useRef, useEffect } from "react";

const Chat = ({onInsert}) => {
  const [chatHistory, setChatHistory] = useState([]);
  const chatBodyRef = useRef();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const generateBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text != "Thinking..."),
        { role: "model", text },
      ]);
    };
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    try {
      const res = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error.message || "Something went wrong!");
      }

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chatHistory]);
  return (
    <div className="container font-sans font-medium m-0 p-0 box-border w-full flex-col min-h-[100vh]">
      <button
        id="chatbot-toggler"
        className="fixed bottom-[30px] right-[35px] h-[50px] w-[50px] flex cursor-pointer rounded-full bg-cyan-700 items-center justify-center"
        onClick={toggleChat}
      >
        <span className="material-symbols-rounded absolute text-white ">
          {isChatOpen ? "close" : "mode_comment"}
        </span>
      </button>
      <div
        className={`chatbot-popup fixed bottom-[90px] right-[35px] w-[420px] bg-white rounded-[15px] shadow-custom overflow-hidden transition-opacity duration-300 transform ${isChatOpen ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-[0.2]"} transform-origin-bottom-right`}
      >
        {/* Chat Header */}
        <div className="chat-header bg-cyan-500 flex items-center justify-between px-[22px] py-[15px]">
          <div className="header-info flex gap-[10px] items-center ">
            <div className="bg-white rounded-full fill-cyan-600">
              <ChatbotIcon />
            </div>
            <h2 className="logo-text text-white text-[1.3rem] font-semibold">
              Chat
            </h2>
          </div>
          <button className="material-symbols-rounded h-[40px] w-[40px] border-none outline-none text-white cursor-pointer text-[1.9rem] pt-[2px] mr-[-10px] bg-none rounded-full transition duration-200 ease hover:bg-cyan-600 scroll-w">
            keyboard_arrow_down
          </button>{" "}
        </div>

        {/* Chat Body */}
        <div
          ref={chatBodyRef}
          className="chat-body px-[22px] py-[25px] h-[460px] mb-[10px] overflow-y-auto flex flex-col gap-[15px] break-words whitespace-pre-line text-[1rem] custom-scrollbar"
        >
          <div className="message bot-message flex items-center gap-[11px]">
            <div className="mb-[2px] self-end bg-cyan-600 rounded-full fill-white">
              <ChatbotIcon />
            </div>
            <p className="message-text px-4 py-3 max-w-[75%] bg-gray-200 rounded-bot">
              Tôi có thể giúp gì được cho bạn?
            </p>
          </div>
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} onInsert={onInsert}/>
          ))}
        </div>

        {/* Chat Footer */}
        <div className="chat-footer bottom-0 w-full bg-white px-[22px] pt-[15px] pb-[20px]">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #ddd3f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #ddd3f9 transparent;
        }
        .transform-origin-bottom-right {
          transform-origin: bottom right;
        }
      `}</style>
    </div>
  );
}

export default Chat;

