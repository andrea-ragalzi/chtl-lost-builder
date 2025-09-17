# CHTL: The Lost Builder

**CHTL: The Lost Builder** is a Progressive Web App (PWA) designed to help players create and manage characters for **Changeling: The Lost 2nd Edition**.

## ✨ Purpose
- Step-by-step guided character creation following the official rules  
- Character sheet always updated in read-only mode  
- Multi-character support and external sharing  
- Export to JSON/PDF  

## 🛠️ Tech Stack
- **Backend**: FastAPI + MongoDB  
- **Frontend**: React (PWA, offline-first)  
- **Architecture**: FARM (FastAPI, React, MongoDB)  

## 🚧 Roadmap
- [ ] **Backend**
  - [X] Setup FastAPI + MongoDB (Docker Compose)
  - [X] Character model & schema validation
  - [X] CRUD endpoints (create, read, update, delete)
  - [ ] Shareable public link (slug)
  - [ ] Rules validation engine (attributes, skills, merits, contracts)
  - [ ] Derived stats calculation
  - [ ] Export/Import (JSON, PDF optional)

- [ ] **Frontend (PWA)**
  - [ ] Project setup (React + Vite + Tailwind)
  - [ ] Character creation wizard (step-by-step)
  - [ ] Read-only live character sheet
  - [ ] Multi-character dashboard
  - [ ] Share & export features
  - [ ] Offline support (IndexedDB + service worker)

- [ ] **Quality**
  - [ ] Unit tests (rules validation, derived stats)
  - [ ] Integration tests (API CRUD + validation)
  - [ ] CI/CD pipeline (lint, test, build)
  - [ ] Documentation (developer + user guide)

## 📖 Legal Note
Changeling: The Lost is a role-playing game published by White Wolf / Onyx Path.  
This is an **unofficial fan-made project** and not affiliated with the publishers.
