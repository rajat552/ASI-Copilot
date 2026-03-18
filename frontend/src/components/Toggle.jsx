import React from 'react';
import { Sun, Moon } from 'lucide-react';

const Toggle = ({ isOn, onToggle, label }) => {
    return (
        <div className="flex items-center gap-3">
            {label && <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">{label}</span>}
            <button
                onClick={onToggle}
                className={`relative w-14 h-7 rounded-full p-1 transition-all duration-300 ${isOn ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
            >
                <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 transform ${isOn ? 'translate-x-7 rotate-0' : 'translate-x-0 rotate-180'
                        }`}
                >
                    {isOn ? (
                        <Moon size={12} className="text-primary fill-primary" />
                    ) : (
                        <Sun size={12} className="text-yellow-500 fill-yellow-500" />
                    )}
                </div>
            </button>
        </div>
    );
};

export default Toggle;
