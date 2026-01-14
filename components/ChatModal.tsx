'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: any;
  read: boolean;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  currentUserId: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';

export function ChatModal({ isOpen, onClose, bookingId, currentUserId }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && bookingId) {
      loadMessages();
      // Refresh messages every 5 seconds
      const interval = setInterval(loadMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [isOpen, bookingId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = async () => {
    if (!bookingId) return;
    
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/messages/booking/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.ok) {
        const result = await response.json();
        const messagesData = result.data || result || [];
        setMessages(Array.isArray(messagesData) ? messagesData : []);
      } else {
        console.error('Failed to load messages:', response.status);
      }
    } catch (error) {
      console.error('خطا في تحميل الرسائل:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || loading) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookingId,
          content: newMessage.trim(),
        }),
      });

      if (response.ok) {
        setNewMessage('');
        await loadMessages();
      } else {
        const error = await response.json();
        alert(error.error || 'هەڵە لە ناردنی پەیام');
      }
    } catch (error) {
      console.error('خطا في إرسال الرسالة:', error);
      alert('هەڵەیەک ڕوویدا');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/20 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">💬 چات</h2>
            <p className="text-teal-200 text-sm mt-1">گفتگۆ دەربارەی داواکاریەکەت</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white text-3xl transition-colors"
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white/50 text-lg">هێشتا هیچ پەیامێک نییە</p>
              <p className="text-white/30 text-sm mt-2">یەکەم پەیامت بنێرە! 👋</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isMyMessage = msg.senderId === currentUserId;
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl p-4 ${
                      isMyMessage
                        ? 'bg-teal-500 text-white'
                        : 'bg-white/10 border border-white/20 text-white'
                    }`}
                  >
                    {!isMyMessage && (
                      <p className="text-xs text-teal-200 mb-1 font-bold">
                        {msg.senderName}
                      </p>
                    )}
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-2 ${isMyMessage ? 'text-teal-100' : 'text-white/50'}`}>
                      {msg.timestamp?.toDate ? new Date(msg.timestamp.toDate()).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      }) : 'ئێستا'}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="p-6 border-t border-white/20">
          <div className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="پەیامێک بنووسە... ✍️"
              className="flex-1 px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || loading}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
            >
              {loading ? '...' : '📨'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
