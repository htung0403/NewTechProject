import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);
      generateBotResponse([
        ...chatHistory,
        { role: "user", text: `Sử dụng nội dung này: ${userMessage}, \n\nHãy tối ưu nội dung cho SEO với:\n- Từ khóa chính và phụ\n- Headings rõ ràng\n- Meta description` },
      ]);
    }, 600);
  };
  return (
    <form
      action="#"
      className="chat-form flex items-center bg-white rounded-[32px] outline outline-[1px] outline-[#CCCCE5] focus-within:outline-2 focus-within:outline-cyan-600"
      onSubmit={handleFormSubmit}
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input border-none outline-none bg-none h-[47px] px-[17px] py-0 text-[1rem] w-full peer"
        required
      />
      <button className="material-symbols-rounded h-[35px] w-[35px] text-white bg-cyan-500 rounded-full flex-shrink-0 border-none outline-none text-[1.15rem] cursor-pointer mr-[6px] transition duration-200 ease hover:bg-cyan-800 peer-valid:block hidden">
        send
      </button>
    </form>
  );
};

export default ChatForm;
