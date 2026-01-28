import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [
        {
            id: '1',
            name: 'Spanish Vocabulary',
            description: 'Basic words and phrases',
            createdAt: new Date().toISOString(),
        },
        {
            id: '2',
            name: 'React Fundamentals',
            description: 'Core concepts of React',
            createdAt: new Date().toISOString(),
        },
        {
            id: '3',
            name: 'Software Engineering',
            description: 'SOLID, Design Patterns, Agile, and more',
            createdAt: new Date().toISOString(),
        }
    ],
};

const decksSlice = createSlice({
    name: 'decks',
    initialState,
    reducers: {
        addDeck: (state, action) => {
            state.items.push({
                ...action.payload,
                createdAt: new Date().toISOString(),
            });
        },
        deleteDeck: (state, action) => {
            state.items = state.items.filter(deck => deck.id !== action.payload);
        },
    },
});

export const { addDeck, deleteDeck } = decksSlice.actions;

export const selectAllDecks = (state) => state.decks.items;

export default decksSlice.reducer;
