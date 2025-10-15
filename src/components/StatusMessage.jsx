import {XCircle} from "lucide-react";
export default function StatusMessage ({ message, type, onClose })  {
    if (!message) return null;

    const baseClasses = "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl flex items-center justify-between transition-all duration-300 transform";
    const typeClasses = type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white';

    return (
        <div className={`${baseClasses} ${typeClasses}`}>
            <p className="font-medium mr-4">{message}</p>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition">
                <XCircle className="w-5 h-5" />
            </button>
        </div>
    );
};