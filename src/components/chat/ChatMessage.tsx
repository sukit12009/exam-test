import { Message } from '../../types/chat';

// Simple date formatter
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          message.isOwn 
            ? 'bg-blue-500 text-white rounded-br-none' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'
        }`}
      >
        {!message.isOwn && (
          <div className="font-bold text-sm mb-1">
            {message.sender}
          </div>
        )}
        <div className="text-sm">{message.text}</div>
        <div 
          className={`text-xs mt-1 text-right ${
            message.isOwn ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {formatTime(new Date(message.timestamp))}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
