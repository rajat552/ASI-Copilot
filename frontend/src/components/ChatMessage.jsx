import React from 'react';
import { User, Bot } from 'lucide-react';

const ChatMessage = ({ role, content, thought }) => {
    const isUser = role === 'user';
    const [isThoughtOpen, setIsThoughtOpen] = React.useState(false);

    return (
        <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] gap-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 border transition-all ${isUser
                    ? 'bg-primary/20 border-primary/30 text-primary'
                    : 'bg-secondary/20 border-secondary/30 text-secondary'
                    }`}>
                    {isUser ? <User size={20} /> : <Bot size={20} />}
                </div>

                <div className="flex flex-col gap-2">
                    <div className={`p-4 rounded-3xl shadow-sm transition-all ${isUser
                        ? 'bg-primary text-white rounded-tr-none'
                        : 'bg-card-bg border border-border-subtle text-text-main rounded-tl-none'
                        }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
                    </div>

                    {!isUser && thought && (
                        <div className="mt-1">
                            <button
                                onClick={() => setIsThoughtOpen(!isThoughtOpen)}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/70 hover:text-primary transition-colors px-1"
                            >
                                <span className={`transform transition-transform duration-300 ${isThoughtOpen ? 'rotate-90' : ''}`}>▶</span>
                                Agent Thinking
                            </button>
                            
                            {isThoughtOpen && (
                                <div className="mt-2 p-4 bg-app-bg/50 backdrop-blur-sm border border-border-subtle rounded-2xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                    {thought.understanding && (
                                        <div>
                                            <span className="text-[9px] font-black text-text-muted uppercase tracking-tighter block mb-1">Understanding</span>
                                            <p className="text-xs text-text-main italic">"{thought.understanding}"</p>
                                        </div>
                                    )}
                                    {thought.assumptions && thought.assumptions.length > 0 && (
                                        <div>
                                            <span className="text-[9px] font-black text-text-muted uppercase tracking-tighter block mb-1">Assumptions</span>
                                            <ul className="list-disc list-inside text-[11px] text-text-main space-y-1">
                                                {thought.assumptions.map((a, i) => <li key={i}>{a}</li>)}
                                            </ul>
                                        </div>
                                    )}
                                    {thought.reasoning && (
                                        <div className="pt-2 border-t border-border-subtle/50">
                                            <span className="text-[9px] font-black text-text-muted uppercase tracking-tighter block mb-1">Agent Reasoning</span>
                                            <p className="text-[11px] text-text-main leading-relaxed">{thought.reasoning}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
