import { createPortal } from 'react-dom';

const ContextMenu = ({
  rightClickItem,
  positionX,
  positionY,
  isToggled,
  buttons,
  contextMenuRef,
}) => {
  const menuContent = (
    <div
      style={{ 
        top: positionY,
        left: positionX,
        position: 'fixed',
        zIndex: 99999,
      }}
      className={`${isToggled ? 'block' : 'hidden'} context-menu bg-slate-200 text-black p-1 rounded-[5px] shadow-lg border 
        text-[0.875rem] w-[200px] min-w-[150px]`}
      ref={contextMenuRef}
    >
      <div className="flex flex-col">
        {buttons.map((button, index) => {
          if (button.isSpacer) {
            return <hr key={index} className="border-0 border-b border-gray-300 my-1" />;
          }

          return (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                button.onClick(e, rightClickItem);
              }}
              className="flex items-center gap-2 px-3 py-2 hover:bg-slate-300 rounded text-left w-full"
            >
              <span className="icon">{button.icon}</span>
              <span className="flex-1">{button.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  // Render the menu at the document root level
  return createPortal(menuContent, document.body);
};

export default ContextMenu;