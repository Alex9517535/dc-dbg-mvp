**Team Alpha**  
- Ryan Arce  
- Nathan Brown  
- Arunbir Singh  

CSC480A: Computer Science Capstone Project I  
National University — San Diego, CA  
Instructor: Dr. Jeffery S. Appel  
September 2025 Term  

---

## 🎮 Project Overview
This project is a **browser-based minimum viable product (MVP)** of the DC Deck-Building Game using the **Cerberus Engine** (implemented with **placeholder assets only** — no licensed art or text).  

The purpose is to demonstrate:
- A **rules-accurate one-player demo** of the core gameplay loop:  
  *setup → turns → buying → line-up refill → scoring*  
- Early validation of **digital feasibility** and **user experience (UX)**.  
- An Agile development approach managed using **Scrum**.  

---

## 🚀 Features
- **Opening Menu Screen** (video-game style start menu with start button, info, credits).  
- **Core Gameplay Loop**:  
  - Draw cards  
  - Generate power  
  - Buy cards from the line-up  
  - Refill the line-up  
  - Score victory points  
- **Basic State Management** with [Zustand](https://github.com/pmndrs/zustand).  
- **Save/Load** game state using browser `localStorage`.  
- **Responsive UI** built with React + TypeScript.  

---

## 🛠️ Tech Stack
- **Language:** TypeScript  
- **UI Framework:** React  
- **Rendering:** DOM/SVG (expandable to PixiJS/Phaser for animations)  
- **State Management:** Zustand  
- **Game Logic:** Pure TypeScript modules + state machine pattern  
- **Persistence:** localStorage  
- **Build Tool:** Vite  
- **Version Control:** Git + GitHub  

---

## 📂 Project Structure
src/ \
assets/react.svg \
core/cards.ts-engine.ts-types.ts \
state/store.ts \
ui/CardView.tsx-Controls.tsx-MenuScreen.tsx-Pile.tsx \
App.tsx \
index.css \
main.tsx \
styles.css DELETE ME LATER\

## ▶️ Getting Started

### 1. Clone the repository

Terminal:
git clone https://github.com/Alex9517535/dc-dbg-mvp.git
cd dc-dbg-mvp

Terminal: 
npm install

Terminal: 
npm run dev

Open http;//localhost:5173 in your browser.

