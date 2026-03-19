import React from 'react';
import { CheckCircle2, Circle, ArrowUpRight, Trash2 } from 'lucide-react';

const TaskCard = ({ _id, title, description, status, priority = 'medium', onToggle, onDelete }) => {
    const isCompleted = status === 'completed' || status === 'done';

    return (
        <div className={`p-5 rounded-3xl border transition-all duration-300 group ${isCompleted
                ? 'bg-app-bg border-border-subtle opacity-50 grayscale'
                : 'bg-card-bg border-border-subtle hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 cursor-pointer'
            }`}
            onClick={() => onToggle && onToggle(_id)}
        >
            <div className="flex items-start gap-4">
                <button
                    className={`mt-1 transition-all transform active:scale-90 ${isCompleted ? 'text-green-500' : 'text-text-muted hover:text-primary'
                        }`}
                >
                    {isCompleted ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                </button>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className={`font-black text-sm tracking-tight transition-all ${isCompleted ? 'line-through text-text-muted' : 'text-text-main'
                            }`}>
                            {title}
                        </h3>
                        {!isCompleted && (
                            <ArrowUpRight size={14} className="text-text-muted group-hover:text-primary transition-colors flex-shrink-0" />
                        )}
                        <button 
                            className="text-text-muted hover:text-red-500 transition-colors flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onDelete) onDelete(_id);
                            }}
                            title="Delete Task"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed line-clamp-2 italic">
                        {description}
                    </p>

                    <div className="flex items-center gap-3 mt-4">
                        <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-[0.15em] border ${priority?.toLowerCase() === 'high' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                priority?.toLowerCase() === 'medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                    'bg-green-500/10 text-green-500 border-green-500/20'
                            }`}>
                            {priority}
                        </span>
                        {isCompleted && (
                            <span className="text-[9px] font-black text-green-500/50 uppercase tracking-widest">Done</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
