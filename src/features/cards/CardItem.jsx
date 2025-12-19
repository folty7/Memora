import React, { useState } from 'react';
import { Trash2, Edit2, RotateCcw } from 'lucide-react';

export default function CardItem({ card, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ front: card.front, back: card.back });

    const handleSave = () => {
        onUpdate(card.id, editData);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 mb-3 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase">Question (Front)</label>
                        <input
                            className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            value={editData.front}
                            onChange={(e) => setEditData({ ...editData, front: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-slate-500 uppercase">Answer (Back)</label>
                        <input
                            className="w-full mt-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            value={editData.back}
                            onChange={(e) => setEditData({ ...editData, back: e.target.value })}
                        />
                    </div>
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="px-3 py-1.5 text-slate-500 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-medium shadow-sm transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="group bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-3 hover:shadow-md hover:border-indigo-100 transition-all flex justify-between items-center">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase w-full block mb-1">Front</span>
                    <p className="text-slate-800 font-medium">{card.front}</p>
                </div>
                <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase w-full block mb-1">Back</span>
                    <p className="text-slate-600">{card.back}</p>
                </div>
            </div>

            <div className="flex items-center space-x-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                    <Edit2 size={18} />
                </button>
                <button
                    onClick={() => onDelete(card.id)}
                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
}
