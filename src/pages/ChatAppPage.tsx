import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import * as FaIcons from 'react-icons/fa';
import useChat from '../hooks/useChat';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';

// Create typed icon components
const FiUsers = FiIcons.FiUsers as React.ComponentType<React.SVGProps<SVGSVGElement>>;
const FiArrowLeft = FiIcons.FiArrowLeft as React.ComponentType<React.SVGProps<SVGSVGElement>>;
const FiRefreshCw = FiIcons.FiRefreshCw as React.ComponentType<React.SVGProps<SVGSVGElement>>;
const FiAlertCircle = FiIcons.FiAlertCircle as React.ComponentType<React.SVGProps<SVGSVGElement>>;
const FaUserCircle = FaIcons.FaUserCircle as React.ComponentType<React.SVGProps<SVGSVGElement>>;

const ChatAppPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [tempUsername, setTempUsername] = useState<string>('');
  const [isUsernameSet, setIsUsernameSet] = useState<boolean>(false);
  const [showUserList, setShowUserList] = useState<boolean>(false);
  const [showUsernameModal, setShowUsernameModal] = useState<boolean>(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userListRef = useRef<HTMLDivElement>(null);

  // Initialize chat with empty username first, will be set after username is provided
  const { 
    messages, 
    users, 
    isConnected, 
    sendMessage, 
    reconnect 
  } = useChat(isUsernameSet ? username : '');
  
  const [isSending, setIsSending] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  
  // Close user list when clicking outside
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (userListRef.current && !userListRef.current.contains(event.target as Node)) {
      setShowUserList(false);
    }
  }, []);
  
  // Handle click outside of user list
  useEffect(() => {
    if (showUserList) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserList, handleClickOutside]);

  // Handle initial connection state
  useEffect(() => {
    if (isConnected) {
      setIsInitializing(false);
    }
  }, [isConnected]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Handle manual reconnect
  const handleReconnect = useCallback(() => {
    if (!isConnected) {
      setIsInitializing(true);
      reconnect();
    }
  }, [isConnected, reconnect]);

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUsername = tempUsername.trim();
    if (trimmedUsername) {
      setUsername(trimmedUsername);
      setIsUsernameSet(true);
      setShowUsernameModal(false);
    }
  };

  const handleSendMessage = useCallback(async (text: string) => {
    if (isConnected && text.trim()) {
      setIsSending(true);
      try {
        await sendMessage(text);
      } catch (error) {
        console.error('Failed to send message:', error);
        // Optionally show an error message to the user
      } finally {
        setIsSending(false);
      }
    }
  }, [isConnected, sendMessage]);

  if (showUsernameModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md relative">
          <button
            onClick={() => navigate('/')}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white pr-6">Enter Your Name</h2>
          <form onSubmit={handleUsernameSubmit}>
            <input
              type="text"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Join Chat
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Back to home"
              >
                <FiArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Real-Time Chat
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative" ref={userListRef}>
                <button
                  onClick={() => setShowUserList(!showUserList)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative"
                  aria-label="Online users"
                  aria-expanded={showUserList}
                >
                  <FiUsers className="h-5 w-5" />
                  {users.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {users.length}
                    </span>
                  )}
                </button>
                
                {showUserList && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-20 border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
                      <h3 className="font-medium text-gray-700 dark:text-gray-200">
                        Online Users <span className="text-gray-500">({users.length})</span>
                      </h3>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add refresh functionality here if needed
                        }}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Refresh user list"
                      >
                        <FiRefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {users.length > 0 ? (
                        users.map((user) => (
                          <div
                            key={user.id}
                            className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center border-b border-gray-100 dark:border-gray-700 last:border-0"
                          >
                            <div className={`h-2.5 w-2.5 rounded-full mr-3 flex-shrink-0 ${
                              user.isOnline ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                            }`}></div>
                            <FaUserCircle className="mr-2 text-gray-400 flex-shrink-0" />
                            <span className="truncate">
                              {user.username}
                              {user.username === username && (
                                <span className="ml-1 text-xs text-blue-500">(You)</span>
                              )}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 text-center">
                          No users online
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className={`h-3 w-3 rounded-full ${
                    isConnected 
                      ? 'bg-green-500 animate-pulse' 
                      : isInitializing 
                        ? 'bg-yellow-500 animate-pulse' 
                        : 'bg-red-500'
                  }`}></div>
                  {isConnected && (
                    <div className="absolute inset-0 rounded-full bg-green-500 opacity-75 animate-ping"></div>
                  )}
                </div>
                <span className={`text-sm ${
                  isConnected 
                    ? 'text-green-600 dark:text-green-400' 
                    : isInitializing 
                      ? 'text-yellow-600 dark:text-yellow-400' 
                      : 'text-red-600 dark:text-red-400'
                }`}>
                  {isInitializing ? 'Connecting...' : isConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        <div className="max-w-3xl mx-auto space-y-4">
          {isInitializing ? (
            <div className="flex flex-col items-center justify-center p-6 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
              <span>Connecting to chat server...</span>
            </div>
          ) : !isConnected ? (
            <div className="flex flex-col items-center p-4 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 rounded-lg mb-4">
              <div className="flex items-center mb-2">
                <FiAlertCircle className="mr-2 flex-shrink-0" />
                <span>Connection lost. Attempting to reconnect...</span>
              </div>
              <button
                onClick={handleReconnect}
                className="mt-2 px-4 py-1.5 text-sm bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-800 dark:hover:bg-yellow-700 text-yellow-800 dark:text-yellow-200 rounded-md transition-colors flex items-center"
                disabled={isInitializing}
              >
                <FiRefreshCw className={`mr-1 ${isInitializing ? 'animate-spin' : ''}`} />
                {isInitializing ? 'Reconnecting...' : 'Reconnect Now'}
              </button>
            </div>
          ) : null}
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-4">💬</div>
              <p className="text-lg">No messages yet</p>
              <p className="text-sm">Say hello to start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage 
                key={message.id} 
                message={{
                  ...message,
                  isOwn: message.sender === username
                }} 
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto">
          <ChatInput 
            onSendMessage={handleSendMessage} 
            isConnected={isConnected}
            isSending={isSending}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatAppPage;
