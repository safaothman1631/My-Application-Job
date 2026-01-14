'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface ChatWindowProps {
  bookingId: string;
  currentUserId: string;
  currentUserName: string;
  otherUserName: string;
  onClose: () => void;
}

export function ChatWindow({
  bookingId,
  currentUserId,
  currentUserName,
  otherUserName,
  onClose,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
    // في الوقت الحقيقي، ستستخدم Firebase Realtime Database أو WebSocket
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [bookingId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:3002/api/messages/booking/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.data) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3002/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookingId,
          content: newMessage,
        }),
      });

      if (response.ok) {
        setNewMessage('');
        fetchMessages();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end md:items-center justify-center">
      <div className="bg-gradient-to-br from-blue-900 via-teal-900 to-cyan-900 w-full md:max-w-2xl md:rounded-3xl rounded-t-3xl shadow-2xl border border-white/20 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-xl text-white font-bold">
              {otherUserName?.charAt(0) || '👤'}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{otherUserName}</h3>
              {isTyping && <p className="text-teal-200 text-xs">داگرتنە نووسین... ✍️</p>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-red-500/20 hover:bg-red-500/40 rounded-xl flex items-center justify-center text-white text-xl transition-all duration-300"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-white/70">هیچ پەیامێک نییە</p>
              <p className="text-white/50 text-sm">یەکەم پەیامەکەت بنێرە!</p>
            </div>
          ) : (
            messages.map((message) => {
              const isMine = message.senderId === currentUserId;
              return (
                <div
                  key={message.id}
                  className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      isMine
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                        : 'bg-white/10 text-white border border-white/20'
                    }`}
                  >
                    <p className="text-sm mb-1">{message.content}</p>
                    <div className="flex items-center gap-2 justify-end">
                      <p className="text-xs opacity-70">
                        {new Date(message.timestamp).toLocaleTimeString('ku', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      {isMine && (
                        <span className="text-xs">
                          {message.read ? '✓✓' : '✓'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="bg-white/10 border-t border-white/20 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="پەیامێک بنووسە..."
              className="flex-1 px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-teal-400"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
            >
              ناردن 📤
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
