// components/ui/AIChatbox.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaUser,
  FaTrash,
  FaMinus,
  FaCar,
  FaFlagCheckered,
} from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🏁 Welcome to F1 AI Assistant! How can I help you today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Gọi API chatbot của bạn
      const response = await fetch('https://himbo22.me/api/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputValue,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text:
          data.response ||
          data.error ||
          'Xin lỗi, tôi không thể trả lời ngay lúc này.',
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error calling chatbot API:', error);

      // Fallback response nếu API lỗi
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Xin lỗi, kết nối đến chatbot đang gặp sự cố. Vui lòng thử lại sau.',
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    if (confirm('Clear all chat history?')) {
      setMessages([
        {
          id: '1',
          text: '🏁 Chat cleared! How can I help you?',
          sender: 'ai',
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Open F1 AI Chat"
        >
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 via-black to-red-700 text-white rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 flex items-center justify-center hover:scale-110">
              <FaCar className="text-2xl group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-white to-black rounded-full flex items-center justify-center shadow-lg">
              <FaFlagCheckered className="text-xs" />
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
          </div>
        </button>
      )}

      {/* Chat Container */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-96 bg-gradient-to-b from-gray-900 to-black text-white rounded-2xl shadow-2xl border border-red-500/20 flex flex-col overflow-hidden transition-all duration-300 ${
            isMinimized ? 'h-16' : 'h-[600px]'
          }`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-black via-red-900/50 to-black p-4 flex items-center justify-between border-b border-red-500/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-black rounded-full flex items-center justify-center border border-red-500/50">
                  <FaRobot className="text-xl" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg">F1 AI Assistant</h3>
                <p className="text-xs text-red-200">
                  {isTyping ? 'Typing...' : 'Online • Ready to help'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Clear chat"
              >
                <FaTrash />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Minimize"
              >
                <FaMinus />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Close"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-black">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === 'user'
                        ? 'flex-row-reverse'
                        : 'flex-row'
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border flex-shrink-0 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 border-blue-500'
                          : 'bg-red-600 border-red-500'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <FaUser className="text-sm" />
                      ) : (
                        <FaRobot className="text-sm" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[75%] rounded-xl p-4 ${
                        message.sender === 'user'
                          ? 'bg-blue-900/30 border border-blue-500/30 rounded-tr-none'
                          : 'bg-gray-800/50 border border-red-500/30 rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                      </p>
                      <p className="text-xs opacity-50 mt-2">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-red-600 border border-red-500 flex items-center justify-center">
                      <FaRobot className="text-sm" />
                    </div>
                    <div className="bg-gray-800/50 border border-red-500/20 rounded-xl rounded-tl-none px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></span>
                        <span
                          className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        ></span>
                        <span
                          className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-800 bg-black/50">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about F1 drivers, teams, races..."
                    className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="px-4 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-white rounded-xl transition-all flex items-center justify-center"
                    title="Send message"
                  >
                    <FaPaperPlane />
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-2 text-center">
                  Press{' '}
                  <kbd className="px-1.5 py-0.5 bg-gray-800 rounded">Enter</kbd>{' '}
                  to send
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AIChatbox;
