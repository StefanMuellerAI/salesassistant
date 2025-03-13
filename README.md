# Sales Assistant

Eine Anwendung zur Generierung personalisierter Verkaufsstrategien mit Hilfe von OpenAI's o3-mini Modell.

## Funktionen

- Auswahl von Kundenprofilen mit detaillierten Informationen
- Auswahl von Produkten/Dienstleistungen
- Generierung personalisierter Verkaufsstrategien basierend auf Kundenprofil und Produkt
- Anzeige von Strategietiteln, Ansätzen, Gesprächspunkten und Eröffnungsnachrichten

## Technologien

- Frontend: React, TypeScript, Tailwind CSS, Vite
- Backend: Node.js, Express
- AI: OpenAI API (o3-mini Modell)

## Einrichtung

### Voraussetzungen

- Node.js (v14 oder höher)
- npm oder yarn
- OpenAI API-Schlüssel

### Installation

1. Klone das Repository:
   ```
   git clone <repository-url>
   cd sales-assistant
   ```

2. Installiere die Frontend-Abhängigkeiten:
   ```
   npm install
   ```

3. Installiere die Backend-Abhängigkeiten:
   ```
   cd server
   npm install
   ```

4. Konfiguriere die Umgebungsvariablen:
   - Erstelle eine `.env`-Datei im `server`-Verzeichnis
   - Füge deinen OpenAI API-Schlüssel hinzu:
     ```
     PORT=3001
     OPENAI_API_KEY=your_openai_api_key_here
     ```

### Starten der Anwendung

1. Starte das Backend:
   ```
   cd server
   npm run dev
   ```

2. Starte das Frontend (in einem neuen Terminal):
   ```
   npm run dev
   ```

3. Öffne die Anwendung im Browser:
   ```
   http://localhost:5173
   ```

## Verwendung

1. Wähle ein Kundenprofil aus der Liste aus
2. Wähle ein Produkt/eine Dienstleistung aus der Liste aus
3. Klicke auf "Generate Sales Strategies"
4. Sieh dir die generierten Strategien an
5. Verwende die "Regenerate"-Funktion, um neue Strategien zu generieren

## Hinweise

- Stelle sicher, dass du einen gültigen OpenAI API-Schlüssel hast
- Die Anwendung verwendet das o3-mini Modell von OpenAI
- Die Generierung von Strategien kann je nach API-Auslastung einige Sekunden dauern 