import React from 'react';
import { User, Bot } from 'lucide-react';

const ChatMessage = ({ role, content }) => {
    const isUser = role === 'user';

    return (
        <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 border transition-all ${isUser
                        ? 'bg-primary/20 border-primary/30 text-primary'
                        : 'bg-secondary/20 border-secondary/30 text-secondary'
                    }`}>
                    {isUser ? <User size={20} /> : <Bot size={20} />}
                </div>

                <div className={`p-4 rounded-3xl shadow-sm transition-all ${isUser
                        ? 'bg-primary text-white rounded-tr-none'
                        : 'bg-card-bg border border-border-subtle text-text-main rounded-tl-none'
                    }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
