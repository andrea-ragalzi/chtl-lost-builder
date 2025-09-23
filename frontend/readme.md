src/
|
+-- app/                  # (Livello 5) Shell e Configurazione Globale
|   +-- config/           # Setup Redux Store, Axios Instance, ecc.
|   +-- providers/        # StoreProvider, ThemeProvider, ecc.
|   +-- App.tsx           # Componente Radice (Shell)
|
+-- pages/                # (Livello 4) Pagine come Composizione di Feature
|   +-- builder/          # Corrisponde alla rotta /builder
|   |   +-- index.tsx     # Sostituisce CharacterBuilderPage.tsx (Aggregatore di Feature)
|   +-- login/            # Corrisponde alla rotta /login
|
+-- features/             # (Livello 3) Logica di Interazione e Scenari Utente
|   +-- kith-selection/   # (Ex characterKith) - Interfaccia per la scelta
|   |   +-- ui/           # I componenti specifici (KithSelector.tsx)
|   |   +-- lib/          # Logica specifica UI (es. useKithFilters)
|   +-- seeming-selection/# (Ex characterSeeming) - Interfaccia per la scelta
|   +-- attribute-setter/ # Altre feature...
|
+-- entities/             # (Livello 2) Modello di Dominio e Stato Core
|   +-- character/        # Entity CORE: Gestisce lo stato principale (slice/reducer)
|   |   +-- model/        # characterSlice.ts, selectors.ts
|   |   +-- types/        # CharacterModel, Kith, Mantle, ecc. (Tipi spostati)
|   +-- kith/             # Entity: Gestisce l'accesso e la logica pura sui dati dei Kith
|   |   +-- api/          # La logica di fetching da useKiths.ts viene qui
|   |   +-- types/        # Tipi per i dati Kith
|   +-- user/             # Entity: Stato utente
|
+-- shared/               # (Livello 1) Codice Universale
|   +-- components/       # Button, Card, ModalBase, ecc.
|   +-- hooks/            # useDebounce, useLocalStorage, ecc.
|   +-- utils/            # formatters, validators generici
|
main.tsx                  # Punto di Mount di ReactDOM (Non in 'src' ma file di bootstrap)
styles.css                # File CSS globale