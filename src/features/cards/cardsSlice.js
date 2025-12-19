import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [
        // Spanish (deckId: '1')
        { id: 'c1', deckId: '1', front: 'Hola', back: 'Hello' },
        { id: 'c2', deckId: '1', front: 'Gracias', back: 'Thank you' },
        { id: 'c3', deckId: '1', front: 'Adiós', back: 'Goodbye' },
        // React Fundamentals (deckId: '2')
        { id: 'c4', deckId: '2', front: 'Component', back: 'Independent and reusable bits of code.' },
        { id: 'c5', deckId: '2', front: 'State', back: 'A built-in object that is used to contain data or information about the component.' },
        { id: 'c6', deckId: '2', front: 'Props', back: 'Arguments passed into React components.' },
        { id: 'c7', deckId: '2', front: 'useEffect', back: 'A Hook that allows you to perform side effects in function components.' },
        { id: 'c8', deckId: '2', front: 'Virtual DOM', back: 'A lightweight representation of the real DOM kept in memory.' },
        { id: 'c9', deckId: '2', front: 'JSX', back: 'A syntax extension for JavaScript that looks like HTML.' },
        { id: 'c10', deckId: '2', front: 'Hooks', back: 'Functions that let you "hook into" React state and lifecycle features from function components.' },
        { id: 'c11', deckId: '2', front: 'React Router', back: 'A standard library for routing in React.' },
        { id: 'c12', deckId: '2', front: 'Redux', back: 'A predictable state container for JavaScript apps.' },
        { id: 'c13', deckId: '2', front: 'Conditional Rendering', back: 'Displaying different components based on certain conditions.' },
        { id: 'c14', deckId: '2', front: 'Keys', back: 'Unique identifiers used by React to identify which items in a list have changed.' },
        { id: 'c15', deckId: '2', front: 'Fragments', back: 'A pattern to group a list of children without adding extra nodes to the DOM.' },
        // Software Engineering (deckId: '3')
        { id: 'se1', deckId: '3', front: 'SOLID Principles', back: 'Five design principles intended to make software designs more understandable, flexible, and maintainable.' },
        { id: 'se2', deckId: '3', front: 'DRY', back: 'Don\'t Repeat Yourself - a principle of software development aimed at reducing repetition.' },
        { id: 'se3', deckId: '3', front: 'Agile', back: 'Iterative approach to software development and project management.' },
        { id: 'se4', deckId: '3', front: 'CI/CD', back: 'Continuous Integration and Continuous Deployment/Delivery.' },
        { id: 'se5', deckId: '3', front: 'Unit Testing', back: 'Level of software testing where individual units or components are tested.' },
        { id: 'se6', deckId: '3', front: 'Design Patterns', back: 'Typical solutions to common problems in software design.' },
        { id: 'se7', deckId: '3', front: 'Microservices', back: 'An architectural style that structures an application as a collection of services.' },
        { id: 'se8', deckId: '3', front: 'Version Control', back: 'Systems that help software teams manage changes to source code over time (e.g., Git).' },
        { id: 'se9', deckId: '3', front: 'TDD', back: 'Test-Driven Development: writing tests before writing the actual code.' },
        { id: 'se10', deckId: '3', front: 'Refactoring', back: 'Restructuring existing computer code without changing its external behavior.' },
        { id: 'se11', deckId: '3', front: 'Code Review', back: 'Systematic examination of computer source code intended to find bugs and improve quality.' },
    ],
};

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addCard: (state, action) => {
            state.items.push(action.payload);
        },
        deleteCard: (state, action) => {
            state.items = state.items.filter(card => card.id !== action.payload);
        },
        updateCard: (state, action) => {
            const { id, front, back } = action.payload;
            const existingCard = state.items.find(card => card.id === id);
            if (existingCard) {
                existingCard.front = front;
                existingCard.back = back;
            }
        }
    },
    extraReducers: (builder) => {
        // When a deck is deleted, delete all its cards
        builder.addCase('decks/deleteDeck', (state, action) => {
            state.items = state.items.filter(card => card.deckId !== action.payload);
        });
    },
});

export const { addCard, deleteCard, updateCard } = cardsSlice.actions;

export const selectCardsByDeckId = (state, deckId) =>
    state.cards.items.filter(card => card.deckId === deckId);

export default cardsSlice.reducer;
