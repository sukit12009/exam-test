import React, { useState, useRef, useEffect } from 'react';
import * as FiIcons from 'react-icons/fi';

// Create typed icon components
const FiSend = FiIcons.FiSend as React.ComponentType<React.SVGProps<SVGSVGElement>>;
const FiAlertCircle = FiIcons.FiAlertCircle as React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isConnected: boolean;
  isSending?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isConnected,
  isSending = false
}) => {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComposing) {
      sendMessage();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  const sendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && isConnected) {
      onSendMessage(trimmedMessage);
      setMessage('');
      // Reset textarea height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-end space-x-2">
        <div className="flex-1 relative">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              placeholder={
                !isConnected 
                  ? "Connecting to chat..." 
                  : "Type a message..."
              }
              disabled={!isConnected || isSending}
              className={`w-full px-4 py-2 border ${
                !isConnected 
                  ? 'border-yellow-300 dark:border-yellow-700' 
                  : 'border-gray-300 dark:border-gray-600'
              } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none pr-12`}
              rows={1}
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            {!isConnected && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <FiAlertCircle className="text-yellow-500 h-5 w-5 animate-pulse" />
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={!message.trim() || !isConnected || isSending}
          className={`px-4 py-2 ${
            isSending 
              ? 'bg-gray-400 dark:bg-gray-600' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center h-10 w-24`}
        >
          {isSending ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
          ) : (
            <>
              <FiSend className="mr-1" />
              <span>Send</span>
            </>
          )}
        </button>
      </div>
      {!isConnected && (
        <div className="mt-2 text-sm text-yellow-600 dark:text-yellow-400 flex items-center">
          <FiAlertCircle className="mr-1" />
          <span>You are currently offline. Messages will be sent when reconnected.</span>
        </div>
      )}
    </form>
  );
};

export default ChatInput;
