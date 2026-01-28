import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllDecks } from '../features/decks/decksSlice';
import { selectCardsByDeckId, addCard, deleteCard, updateCard } from '../features/cards/cardsSlice';
import { ArrowLeft, Plus, Play, MoreVertical, Trash2 } from 'lucide-react';
import CardItem from '../features/cards/CardItem';

export default function DeckDetail() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const deck = useSelector((state) =>
        state.decks.items.find(d => d.id === deckId)
    );
    const cards = useSelector((state) => selectCardsByDeckId(state, deckId));

    const [newCard, setNewCard] = useState({ front: '', back: '' });
    const [isAdding, setIsAdding] = useState(false);

    if (!deck) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Deck Not Found</h2>
                <Link to="/" className="text-indigo-600 hover:text-indigo-800 font-medium">Return to Dashboard</Link>
            </div>
        );
    }

    const handleAddCard = (e) => {
        e.preventDefault();
        if (!newCard.front.trim() || !newCard.back.trim()) return;

        dispatch(addCard({
            id: crypto.randomUUID(),
            deckId: deck.id,
            front: newCard.front,
            back: newCard.back
        }));

        setNewCard({ front: '', back: '' });
        // Keep the form open for rapid entry, or focus back to first input
        document.getElementById('frontInput')?.focus();
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header */}
            <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center text-slate-500 hover:text-slate-800 transition-colors">
                        <ArrowLeft size={20} className="mr-1" />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
                            {cards.length} Cards
                        </span>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

                {/* Deck Info */}
                <div className="mb-8 p-6 bg-linear-to-br from-indigo-600 to-violet-600 rounded-2xl shadow-lg text-white">
                    <h1 className="text-3xl font-bold mb-2">{deck.name}</h1>
                    <p className="text-indigo-100 opacity-90 max-w-2xl">{deck.description || "No description provided."}</p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            to={`/deck/${deck.id}/study`}
                            className={`inline-flex items-center px-5 py-2.5 rounded-xl font-bold shadow-md transition-all ${cards.length > 0 ? 'bg-white text-indigo-600 hover:bg-indigo-50' : 'bg-white/20 text-white/50 cursor-not-allowed'}`}
                            onClick={(e) => cards.length === 0 && e.preventDefault()}
                        >
                            <Play size={20} className="mr-2 fill-current" />
                            Study Now
                        </Link>
                        <button
                            onClick={() => setIsAdding(!isAdding)}
                            className="inline-flex items-center px-5 py-2.5 bg-indigo-700/50 hover:bg-indigo-700 text-white rounded-xl font-semibold backdrop-blur-sm transition-all border border-indigo-400/30"
                        >
                            <Plus size={20} className="mr-2" />
                            Add Cards
                        </button>
                    </div>
                </div>

                {/* Add Card Form (Collapsible) */}
                {isAdding && (
                    <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 animate-slide-down">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-slate-800">Add New Card</h3>
                            <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600 text-sm">Close</button>
                        </div>
                        <form onSubmit={handleAddCard}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 mb-1">Question (Front)</label>
                                    <textarea
                                        id="frontInput"
                                        rows={3}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none"
                                        placeholder="e.g. What is a component?"
                                        value={newCard.front}
                                        onChange={(e) => setNewCard({ ...newCard, front: e.target.value })}
                                        autoFocus
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-600 mb-1">Answer (Back)</label>
                                    <textarea
                                        rows={3}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none"
                                        placeholder="e.g. Reusable piece of UI..."
                                        value={newCard.back}
                                        onChange={(e) => setNewCard({ ...newCard, back: e.target.value })}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && e.ctrlKey) handleAddCard(e);
                                        }}
                                    />
                                    <p className="text-xs text-slate-400 mt-1 text-right">Ctrl + Enter to Save</p>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md shadow-indigo-200 transition-all flex items-center justify-center"
                            >
                                <Plus size={20} className="mr-2" />
                                Add to Deck
                            </button>
                        </form>
                    </div>
                )}

                {/* Cards List */}
                <div className="space-y-1">
                    {cards.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-slate-500 mb-4">This deck is empty.</p>
                            <button onClick={() => setIsAdding(true)} className="text-indigo-600 font-semibold hover:underline">Add your first card</button>
                        </div>
                    ) : (
                        cards.map(card => (
                            <CardItem
                                key={card.id}
                                card={card}
                                onDelete={(id) => dispatch(deleteCard(id))}
                                onUpdate={(id, data) => dispatch(updateCard({ id, ...data }))}
                            />
                        ))
                    )}
                </div>

            </main>
        </div>
    );
}
