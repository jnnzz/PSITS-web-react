import React from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";

const CodeBlock = ({ code, language = "javascript", title }) => {
  const { isDarkMode } = useDarkMode();
  
  return (
    <div className="space-y-2">
      {title && (
        <h4 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h4>
      )}
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm text-gray-100">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
