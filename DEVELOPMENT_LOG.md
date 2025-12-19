# 📋 Development Log: Memora App

Tento dokument slúži ako chronologický záznam vývoja aplikácie **Memora**, vrátane použitých modelov, chýb zo strany AI a zásahov používateľa (Human-in-the-loop).

---

## 📅 Chronológia Vývoja

### 1. Inicializácia Projektu
-   **Cieľ:** Vytvorenie React + Vite projektu podľa `Memora.md`.
-   **Model:** Gemini 3 Pro High
-   **Akcia:** Spustenie `create-vite`, inštalácia základných balíčkov (Redux, Tailwind, Router).
-   **❌ AI Error:** 
    1.  Pokus o `mkdir` viacerých priečinkov naraz v PowerShell syntaxi zlyhal (`mkdir src\app src\features...`).
    2.  Pôvodný príkaz `create-vite` bol spustený v koreňovom priečinku, ktorý nebol prázdny. 
-   **✅ Oprava:** AI opravila syntax pre vytváranie priečinkov a úspešne inicializovala štruktúru.

### 2. Implementácia TailwindCSS & Dashboard
-   **Cieľ:** Nastavenie štýlov a prvej obrazovky.
-   **Model:** Gemini 3 Pro High
-   **Akcia:** Konfigurácia TailwindCSS, vytvorenie `decksSlice.js` a `Dashboard.jsx`.
-   **❌ AI Error / User Feedback:**
    -   Používateľ nahlásil chybu: `[plugin:vite:css] ... trying to use tailwindcss directly`.
    -   **Príčina:** AI použila konfiguráciu pre Tailwind v4 bez potrebného adaptéra `@tailwindcss/postcss`.
-   **✅ Oprava:** Inštalácia chýbajúceho balíčka a úprava `postcss.config.js` + `index.css`.

### 3. Implementácia Detailov a Štúdia
-   **Cieľ:** Vytvoriť `DeckDetail`, `cardsSlice` a `StudyPage`.
-   **Model:** Gemini 3 Pro Low
-   **Akcia:** Implementácia logiky kariet, 3D flip animácia, routing.
-   **❌ AI Error:**
    -   Nástroj `replace_file_content` zlyhal pri úprave `store.js` (nenašiel cieľový text).
    -   **Nefunkčné tlačidlo:** Používateľ nahlásil: *"nefunguje open tlacidlo"*. AI použila obyčajný `<button>` namiesto `<Link>` pre navigáciu.
-   **✅ Oprava:** AI nahradila tlačidlo komponentom `<Link>` a opravila drobné warningy v syntaxi Tailwindu (gradienty).

### 4. Havária a Obnova (Index.css)
-   **Cieľ:** Debugging po reverte zmien používateľom.
-   **Model:** Gemini 3 Pro High
-   **Situácia:** Používateľ nahlásil: `Failed to resolve import "./index.css"`. Súbor bol zmazaný.
-   **✅ Oprava:** AI okamžite znovu vytvorila súbor `src/index.css` so všetkými potrebnými importmi a 3D utilitami.

### 5. Dáta a Logic Refactoring
-   **Cieľ:** Pridať dynamické počty kariet a dummy dáta (React, Software Engineering).
-   **Model:** Gemini 3 Flash
-   **Akcia:** Rozšírenie `initialState` pre karty.
-   **❌ AI Error:** 
    -   Náradie `replace_file_content` opäť zlyhalo pri vkladaní veľkého bloku textu do `cardsSlice.js`.
    -   **Logická chyba:** Používateľ nahlásil: *"nove karty sa mi nezobrazuju"*.
    -   **Príčina:** `Redux-persist` držal v cache starý stav a ignoroval nový `initialState` v kóde.
-   **✅ Oprava:** AI najprv skúsila manuálne metódu (`write_to_file` celého súboru). Následne navrhla tlačidlo "Reset Data".

### 6. Finalizácia a Best Practices
-   **Cieľ:** Správne riešenie perzistencie dát.
-   **Model:** Gemini 3 Pro Low
-   **User Feedback:** Používateľ odmietol manuálne tlačidlo a žiadal "best practice" riešenie.
-   **✅ Oprava:** AI implementovala **Key Rotation** (zmena kľúča v `redux-persist` z `root` na `memora_v1`), čo automaticky invalidovalo starú cache a načítalo nové dáta bez nutnosti interakcie používateľa.

---

## 📊 Prehľad Chýb

| Typ Chyby | Popis | Riešenie |
| :--- | :--- | :--- |
| **Command Line** | Zlá syntax `mkdir` v PowerShell a `npx` v neprázdnom dir. | Použitie sekvenčných príkazov. |
| **Dependency** | Nekompatibilita Tailwind v4 a PostCSS. | Inštalácia `@tailwindcss/postcss`. |
| **UX/Logic** | Tlačidlo "Open" nebolo prelinkované. | Výmena za `react-router-dom/Link`. |
| **State Mgmt** | Nové dáta sa neprejavili (Persist Cache). | Zmena `persistConfig.key` (Migrácia). |
| **Tool Use** | Zlyhanie `replace_file_content` (fuzzy match). | Fallback na `write_to_file` (prepísanie celého súboru). |

## 🧠 Použité Modely

1.  **Gemini 3 Pro High:** Inicializácia, Architektúra, Core CSS fixy, Git konfigurácia.
2.  **Gemini 3 Pro Low:** Rýchle opravy (Link button), Refaktoring perzistencie.
3.  **Gemini 3 Flash:** Generovanie obsahu (Flashcard dáta) a zložitejšie úpravy Slicov.
