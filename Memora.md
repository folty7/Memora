# Memora (React Edition)

---

### 📄 Základné informácie

- **Názov projektu:** Memora – webová aplikácia pre učenie pomocou flashcards
- **Cieľ:** Vytvoriť funkčnú Single Page Aplikáciu (SPA) na báze Reactu s využitím profesionálneho state managementu.
- **Technické zameranie:** Komponentová architektúra, **Redux Toolkit**, asynchrónny tok dát a perzistencia.

---

### 🛠 Technologický Stack (Industry Standard)

| **Vrstva** | **Technológia** | **Účel** |
| --- | --- | --- |
| **Framework** | **React 18/19 (Vite)** | Moderné jadro aplikácie využívajúce funkcionálne komponenty. |
| **State Management** | **Redux Toolkit (RTK)** | **Centrálny store** aplikácie. Správa balíčkov, kartičiek a stavu učenia. |
| **Routing** | **React Router v6/v7** | Deklaratívny routing pre navigáciu medzi obrazovkami. |
| **Styling** | **TailwindCSS** | Utility-first CSS pre moderný a responzívny dizajn. |
| **Perzistencia** | **Redux-Persist** | Automatické ukladanie celého Redux storu do `localStorage`. |
| **Ikony** | **Lucide React** | Typovo bezpečné ikony pre UI prvky. |

---

### 🎯 Minimálna funkcionalita (MVP)

1. **Dashboard (Správa balíčkov):**
    - Zobrazenie zoznamu balíčkov (Decks) zo storu.
    - Vytvorenie nového balíčka cez modálne okno alebo formulár.
    - Vymazanie balíčka (vrátane všetkých jeho kartičiek).
2. **Editor balíčka (Správa kartičiek):**
    - Zobrazenie obsahu konkrétneho balíčka na samostatnej ceste (`/deck/:id`).
    - Pridávanie nových kartičiek (vstupy: Otázka a Odpoveď).
    - Mazanie a editácia existujúcich kartičiek.
3. **Režim učenia (Study Mode):**
    - Algoritmus pre postupné prechádzanie kartičiek.
    - Funkcia "Flip" (otočenie karty) pomocou lokálneho stavu.
    - Logika pre ukončenie lekcie a návrat na dashboard.
4. **Dátová integrita:**
    - Všetky zmeny sa okamžite premietajú do globálneho storu.
    - Dáta zostávajú zachované aj po zavretí prehliadača.

---

### 🏗 Architektúra Reduxu

V projekte budeš implementovať klasický Redux tok dát, ktorý je základom pre prácu vo veľkých tímoch.

- **Store:** Jediný zdroj pravdy (single source of truth).
- **Slices:** Rozdelenie logiky (napr. `deckSlice.js` pre dáta a `uiSlice.js` pre stavy ako Dark Mode).
- **Selectors:** Efektívne vyberanie dát zo storu pomocou hooku `useSelector`.
- **Dispatch:** Odosielanie akcií (napr. `dispatch(addCard(...))`) pomocou hooku `useDispatch`.

---

### 📱 Obrazovky a Routing

1. **Home / Dashboard (`/`)**: Prehľad balíčkov s počtom kartičiek.
2. **Deck Detail (`/deck/:deckId`)**: Správa kartičiek v balíčku.
3. **Study Mode (`/deck/:deckId/study`)**: Interaktívne rozhranie pre učenie.
4. **Not Found ()**: Error stránka pre neexistujúce cesty.

---

### 📂 Profesionálna štruktúra priečinkov

Tento štýl organizácie (Feature-based) je v korporátnom prostredí najžiadanejší:

Plaintext

`src/
├── app/
│   └── store.js             # Konfigurácia Redux storu a middleware
├── features/
│   ├── decks/               # Logika balíčkov
│   │   ├── decksSlice.js    # RTK Slice (actions & reducers)
│   │   ├── DeckList.jsx     # UI komponenty
│   │   └── DeckItem.jsx
│   └── cards/               # Logika kartičiek a učenia
│       ├── cardsSlice.js
│       └── Flashcard.jsx
├── components/              # Znovupoužiteľné UI (Button, Input, Navbar)
├── pages/                   # Stránky pre Router (Home.jsx, StudyPage.jsx)
├── App.jsx                  # Definícia trás (Routes)
└── main.jsx                 # Entry point s Redux Providerom`

---

### 📝 Zadanie pre prvý krok (Vytvorenie základu)

1. Inicializuj projekt pomocou `npm create vite@latest memora -- --template react`.
2. Nainštaluj závislosti: `npm install @reduxjs/toolkit react-redux react-router-dom lucide-react redux-persist`.
3. Nastav TailwindCSS.
4. **Vytvor `decksSlice.js`**, ktorý bude obsahovať pole balíčkov a reducery pre pridanie a zmazanie balíčka.