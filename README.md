# Memora

**Memora** is a modern Single Page Application (SPA) designed to help users learn efficiently using flashcards. Built with a robust technology stack including React, Redux Toolkit, and TailwindCSS, Memora offers a premium, responsive, and interactive user experience.

![Memora Dashboard](https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80) 
*(Note: Screenshot placeholder)*

## 🚀 Features

-   **🗂️ Deck Management:** Create, organize, and delete flashcard decks with ease.
-   **📝 Smart Card Editor:** Add, edit, and manage flashcards within each deck. Includes inline editing and rapid entry support.
-   **🎓 Interactive Study Mode:**
    -   **3D Flip Animations:** Engaging visualizations mimicking real physical cards.
    -   **Progress Tracking:** Visual indicators of your study session progress.
    -   **Session Feedback:** Celebrate your success upon completing a deck.
-   **🔒 Data Persistence:** Never lose your progress. All data is automatically saved to `localStorage` using Redux Persist.
-   **🎨 Premium Design:** A clean, modern UI built with TailwindCSS v4, featuring glassmorphism, smooth transitions, and a curated color palette.

## 🛠️ Tech Stack

This project strictly follows modern industry standards:

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 18/19](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **State Management** | [Redux Toolkit (RTK)](https://redux-toolkit.js.org/) |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **Styling** | [TailwindCSS v4](https://tailwindcss.com/) |
| **Persistence** | [Redux-Persist](https://github.com/rt2zz/redux-persist) |
| **Icons** | [Lucide React](https://lucide.dev/) |

## 🏗️ Architecture

The project is structured using a **Feature-based architecture**, making it scalable and easy to maintain:

```bash
src/
├── app/                 # Store configuration
├── features/            # Business logic (Slices & Components by feature)
│   ├── decks/           # Deck management logic
│   └── cards/           # Flashcard logic
├── components/          # Shared UI components
├── pages/               # Main application views (Dashboard, Study, Detail)
└── main.jsx             # Entry point
```

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/folty7/Memora.git
    cd Memora
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 🔄 Resetting Data

If you need to restore the default sample decks (React Fundamentals, Software Engineering, etc.):
1.  Open `src/app/store.js`.
2.  Change the `persistConfig.key` value (e.g., from `memora_v1` to `memora_v2`).
3.  Reload the application.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---
*Created by Andrej Folta*
