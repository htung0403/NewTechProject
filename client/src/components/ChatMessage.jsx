import ChatbotIcon from "./ChatbotIcon";
import ContextMenu from "./ContextMenu";
import { useRef, useState, useEffect } from "react";

const ChatMessage = ({ chat, onCopy, onInsert }) => {
  const contextMenuRef = useRef(null);
  const [contextMenu, setContextMenu] = useState({
    position: { x: "0px", y: "0px" },
    toggled: false,
  });

  const handleOnContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Adjust position to prevent menu from going off screen
    const x = Math.min(e.clientX, window.innerWidth - 200); // 200 is menu width
    const y = Math.min(e.clientY, window.innerHeight - 200); // Approximate menu height

    console.log("Context menu triggered:", { x, y });

    setContextMenu({
      position: { x: `${x}px`, y: `${y}px` },
      toggled: true,
    });
  };

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(e.target)
      ) {
        setContextMenu((prev) => ({ ...prev, toggled: false }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied successfully");
      // Close the context menu after copying
      setContextMenu((prev) => ({ ...prev, toggled: false }));
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };
  const buttons = [
    {
      text: "Copy",
      onClick: () => handleCopy(chat.text),
      icon: "📋",
    },
    {
      text: "",
      onClick: () => null,
      isSpacer: true,
    },
    {
      text: "Insert into editor",
      onClick: () => {
        onInsert?.(chat.text);
        setContextMenu((prev) => ({ ...prev, toggled: false }));
      },
      icon: "📝",
    },
  ];

  if (chat.role === "model") {
    return (
      !chat.hideInChat && (
        <div className="message bot-message flex items-center gap-[11px] relative">
          <div className="mb-[2px] self-end bg-cyan-600 rounded-full fill-white">
            <ChatbotIcon />
          </div>
          <div
            className="message-text px-4 py-3 max-w-[75%] bg-gray-200 rounded-bot cursor-pointer"
            onContextMenu={handleOnContextMenu}
          >
            {chat.text}
          </div>
          <ContextMenu
            rightClickItem={chat}
            positionX={contextMenu.position.x}
            positionY={contextMenu.position.y}
            isToggled={contextMenu.toggled}
            buttons={buttons}
            contextMenuRef={contextMenuRef}
          />
        </div>
      )
    );
  }

  return (
    !chat.hideInChat && (
      <div className="message user-message px-4 py-3 max-w-[75%] bg-cyan-500 rounded-user flex flex-col items-end self-end relative">
        <div
          className="message-text text-white cursor-pointer"
          onContextMenu={handleOnContextMenu}
        >
          {chat.text}
        </div>
        <ContextMenu
          rightClickItem={chat}
          positionX={contextMenu.position.x}
          positionY={contextMenu.position.y}
          isToggled={contextMenu.toggled}
          buttons={buttons}
          contextMenuRef={contextMenuRef}
        />
      </div>
    )
  );
};

export default ChatMessage;
