import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCardsByDeckId } from '../features/cards/cardsSlice';
import { X, ArrowLeft, ArrowRight, RotateCw, CheckCircle } from 'lucide-react';

export default function StudyPage() {
    const { deckId } = useParams();
    const cards = useSelector((state) => selectCardsByDeckId(state, deckId));

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    // Reset state if deck changes (unlikely) or on mount
    useEffect(() => {
        setCurrentIndex(0);
        setIsFlipped(false);
        setIsFinished(false);
    }, [deckId]);

    if (!cards || cards.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <h2 className="text-xl font-bold text-slate-800 mb-2">No cards to study</h2>
                <Link to={`/deck/${deckId}`} className="text-indigo-600 font-medium hover:underline">Add some cards first</Link>
            </div>
        );
    }

    const handleNext = () => {
        if (currentIndex < cards.length - 1) {
            setIsFlipped(false);
            setTimeout(() => setCurrentIndex(prev => prev + 1), 150); // Small delay for smooth transition if needed, but direct is fine
        } else {
            setIsFinished(true);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setIsFlipped(false);
            setCurrentIndex(prev => prev - 1);
        }
    };

    const currentCard = cards[currentIndex];
    const progress = ((currentIndex + 1) / cards.length) * 100;

    if (isFinished) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full border border-indigo-50 animate-fade-in-up">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Great Job!</h1>
                    <p className="text-slate-500 mb-8">You've reviewed all {cards.length} cards in this deck.</p>

                    <div className="space-y-3">
                        <button
                            onClick={() => {
                                setIsFinished(false);
                                setCurrentIndex(0);
                                setIsFlipped(false);
                            }}
                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all"
                        >
                            Study Again
                        </button>
                        <Link
                            to="/"
                            className="block w-full py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                        >
                            Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between">
                <Link to={`/deck/${deckId}`} className="p-2 bg-white rounded-full text-slate-500 hover:text-slate-900 shadow-sm transition-all hover:scale-105">
                    <X size={20} />
                </Link>
                <div className="text-sm font-semibold text-slate-400">
                    {currentIndex + 1} / {cards.length}
                </div>
                <div className="w-10"></div> {/* Spacer */}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 h-1.5">
                <div
                    className="bg-indigo-600 h-1.5 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Main Card Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 relative perspective-1000">

                {/* Card Container */}
                <div
                    onClick={() => setIsFlipped(!isFlipped)}
                    className={`cursor-pointer w-full max-w-xl aspect-3/2 relative transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : 'rotate-y-0'}`}
                >
                    {/* Front */}
                    <div className="absolute inset-0 bg-white rounded-3xl shadow-xl border-b-4 border-slate-100 flex items-center justify-center p-8 backface-hidden z-10">
                        <div className="text-center">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 block">Question</span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
                                {currentCard.front}
                            </h2>
                            <p className="text-sm text-slate-400 mt-8 absolute bottom-6 w-full left-0">Tap to flip</p>
                        </div>
                    </div>

                    {/* Back */}
                    <div className="absolute inset-0 bg-indigo-600 rounded-3xl shadow-xl border-b-4 border-indigo-800 flex items-center justify-center p-8 backface-hidden rotate-y-180 z-0">
                        <div className="text-center text-white">
                            <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest mb-4 block">Answer</span>
                            <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                                {currentCard.back}
                            </h2>
                        </div>
                    </div>
                </div>

            </div>

            {/* Controls */}
            <div className="pb-10 px-6 max-w-xl mx-auto w-full flex items-center justify-between gap-6">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className={`p-4 rounded-full transition-all ${currentIndex === 0 ? 'text-slate-300 cursor-not-allowed' : 'bg-white text-slate-600 shadow-md hover:bg-slate-50 hover:scale-105'}`}
                >
                    <ArrowLeft size={24} />
                </button>

                <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                    <RotateCw size={20} />
                    Flip Card
                </button>

                <button
                    onClick={handleNext}
                    className="p-4 bg-white text-indigo-600 rounded-full shadow-md hover:bg-indigo-50 hover:scale-105 transition-all"
                >
                    <ArrowRight size={24} />
                </button>
            </div>
        </div>
    );
}
