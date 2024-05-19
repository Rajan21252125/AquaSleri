/* eslint-disable react/prop-types */
import { useState } from "react";

const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="group relative flex max-w-max flex-col items-center justify-center z-20"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute left-1/2 top-6 ml-auto mr-auto min-w-max -translate-x-1/2 scale-0 transform rounded-lg px-3 py-2 text-xs font-medium transition-all duration-500 group-hover:scale-100">
          <div className="flex max-w-xs flex-col items-center shadow-lg">
            <div className="clip-bottom h-5 w-4 bg-transparent"></div>
            <div className="rounded bg-gray-800 p-2 text-center text-xs text-white">
              {content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
