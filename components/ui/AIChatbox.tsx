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

    // Simulate AI response
    setTimeout(
      () => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getAIResponse(inputValue),
          sender: 'ai',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000
    );
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();

    // F1 responses
    if (input.includes('verstappen') || input.includes('max')) {
      return '🏎️ Max Verstappen is the current World Champion, racing for Red Bull Racing. He dominated the 2023 season with record-breaking performances!';
    }
    if (input.includes('ferrari')) {
      return "🔴 Ferrari is the oldest F1 team with 16 Constructors' Championships. Charles Leclerc and Carlos Sainz are their current drivers.";
    }
    if (input.includes('mercedes')) {
      return "⚫ Mercedes-AMG dominated 2014-2020 with 8 consecutive Constructors' titles. Lewis Hamilton drives for them.";
    }
    if (
      input.includes('schedule') ||
      input.includes('race') ||
      input.includes('next')
    ) {
      return '📅 Check the Race Schedule section for the complete F1 calendar, upcoming races, and session timings!';
    }
    if (input.includes('ticket') || input.includes('buy')) {
      return '🎫 Visit our Ticket Sales section to purchase race tickets, VIP packages, and hospitality experiences!';
    }
    if (input.includes('fantasy') || input.includes('game')) {
      return '🎮 Join our Fantasy League! Pick your team, earn points, and compete with other F1 fans for prizes!';
    }
    if (input.includes('news') || input.includes('article')) {
      return '📰 Check the Content section for latest F1 news, race analysis, technical updates, and exclusive interviews!';
    }
    if (input.includes('hi') || input.includes('hello')) {
      return '👋 Hello! Welcome to F1 AI Assistant! Ask me anything about Formula 1!';
    }
    if (input.includes('thanks') || input.includes('thank')) {
      return "😊 You're welcome! Feel free to ask me anything else about F1! 🏎️💨";
    }

    // Default
    return '🤔 Interesting question! I can help you with:\n• Drivers & Teams info\n• Race schedules\n• Buy tickets\n• Fantasy leagues\n• Latest F1 news\n\nWhat would you like to know?';
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
                        {message.text}
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
