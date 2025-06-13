import { useState, useEffect, useCallback, useRef } from 'react';
import { Message, ChatUser } from '../types/chat';

// Define message types for our protocol
const MESSAGE_TYPES = {
  JOIN: 'join',
  LEAVE: 'leave',
  MESSAGE: 'message',
  USER_LIST: 'userList',
  NOTIFICATION: 'notification'
} as const;

type MessageType = typeof MESSAGE_TYPES[keyof typeof MESSAGE_TYPES];

interface SocketMessage {
  type: MessageType;
  data: any;
}

interface UseChatReturn {
  messages: Message[];
  users: ChatUser[];
  isConnected: boolean;
  sendMessage: (text: string) => void;
  reconnect: () => void;
}

const useChat = (username: string): UseChatReturn => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // WebSocket server URL - in production, this should be in your environment variables
  const WS_URL = 'wss://echo.websocket.org';

  const connectWebSocket = useCallback(() => {
    if (username.trim() === '') return;

    if (ws.current) {
      ws.current.close();
    }

    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => {
      console.log('Connected to WebSocket');
      setIsConnected(true);
      reconnectAttempts.current = 0;
      
      // Send join message
      if (ws.current?.readyState === WebSocket.OPEN) {
        const joinMessage: SocketMessage = {
          type: MESSAGE_TYPES.JOIN,
          data: {
            username,
            timestamp: new Date().toISOString()
          }
        };
        ws.current.send(JSON.stringify(joinMessage));
      }
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as SocketMessage;
        
        switch (message.type) {
          case MESSAGE_TYPES.USER_LIST:
            setUsers(message.data.users || []);
            break;
            
          case MESSAGE_TYPES.MESSAGE:
          case MESSAGE_TYPES.NOTIFICATION: {
            const newMessage: Message = {
              id: Date.now().toString(),
              sender: message.data.sender,
              text: message.data.text,
              timestamp: new Date(message.data.timestamp),
              isOwn: message.data.sender === username
            };
            setMessages(prev => [...prev, newMessage]);
            break;
          }
          
          default:
            console.warn('Unknown message type:', message.type);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    ws.current.onclose = () => {
      console.log('Disconnected from WebSocket');
      setIsConnected(false);
      
      // Attempt to reconnect with exponential backoff
      if (reconnectAttempts.current < maxReconnectAttempts) {
        const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
        console.log(`Attempting to reconnect in ${delay}ms...`);
        
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectAttempts.current += 1;
          connectWebSocket();
        }, delay);
      }
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      ws.current?.close();
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [username]);

  const sendMessage = useCallback((text: string) => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected');
      return;
    }
    
    const message: SocketMessage = {
      type: MESSAGE_TYPES.MESSAGE,
      data: {
        sender: username,
        text: text.trim(),
        timestamp: new Date().toISOString()
      }
    };
    
    ws.current.send(JSON.stringify(message));
  }, [username]);

  // Initialize WebSocket connection
  useEffect(() => {
    connectWebSocket();
    
    return () => {
      // Cleanup WebSocket connection
      if (ws.current) {
        if (ws.current.readyState === WebSocket.OPEN) {
          const leaveMessage: SocketMessage = {
            type: MESSAGE_TYPES.LEAVE,
            data: {
              username,
              timestamp: new Date().toISOString()
            }
          };
          ws.current.send(JSON.stringify(leaveMessage));
        }
        ws.current.close();
      }
      
      // Clear any pending reconnection attempts
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connectWebSocket, username]);

  const reconnect = useCallback(() => {
    if (ws.current?.readyState !== WebSocket.OPEN) {
      reconnectAttempts.current = 0; // Reset reconnect attempts
      connectWebSocket();
    }
  }, [connectWebSocket]);

  return {
    messages,
    users,
    isConnected,
    sendMessage,
    reconnect,
  };
};

export default useChat;
