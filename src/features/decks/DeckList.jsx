import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllDecks, deleteDeck } from './decksSlice';
import { Trash2, BookOpen, Layers } from 'lucide-react';

export default function DeckList() {
    const decks = useSelector(selectAllDecks);
    const allCards = useSelector((state) => state.cards.items);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this deck?')) {
            dispatch(deleteDeck(id));
        }
    };

    if (decks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-slate-100 text-center">
                <Layers className="w-16 h-16 text-indigo-200 mb-4" />
                <h3 className="text-xl font-semibold text-slate-800 mb-2">No decks found</h3>
                <p className="text-slate-500 max-w-sm">
                    You haven't created any flashcard decks yet. Click the "New Deck" button to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => {
                const cardCount = allCards.filter(card => card.deckId === deck.id).length;

                return (
                    <div
                        key={deck.id}
                        className="group relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-indigo-100 transition-all duration-300 flex flex-col"
                    >
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleDelete(deck.id)}
                                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                title="Delete Deck"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1">{deck.name}</h3>
                            <p className="text-slate-500 text-sm mb-4 line-clamp-2 h-10">
                                {deck.description || "No description provided."}
                            </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-sm">
                            <span className="flex items-center text-slate-500 font-medium">
                                <Layers size={16} className="mr-2 text-indigo-500" />
                                {cardCount} cards
                            </span>
                            <Link to={`/deck/${deck.id}`} className="flex items-center text-indigo-600 font-semibold hover:text-indigo-700">
                                Open
                                <BookOpen size={16} className="ml-1.5" />
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
