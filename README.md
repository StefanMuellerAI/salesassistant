# Sales Assistant

Eine Anwendung zur Analyse von Kundenprofilen und Produkten, um personalisierte Verkaufsstrategien zu generieren.

## Funktionen

- Auswahl von Kundenprofilen
- Auswahl von Produkten/Dienstleistungen
- Generierung von personalisierten Verkaufsstrategien mit OpenAI
- Anzeige von Impressum und Datenschutzerklärung

## Technologien

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Node.js, Express
- KI: OpenAI API

## Lokale Entwicklung

1. Repository klonen
2. Abhängigkeiten installieren:
   ```
   npm install
   ```
3. `.env`-Datei erstellen (basierend auf `.env.example`) und OpenAI API-Schlüssel eintragen
4. Backend-Server starten:
   ```
   node server/server.js
   ```
5. Frontend-Entwicklungsserver starten:
   ```
   npm run dev
   ```

## Deployment auf Vercel

1. Stelle sicher, dass du ein Vercel-Konto hast und die Vercel CLI installiert ist:
   ```
   npm install -g vercel
   ```

2. Führe den Login-Befehl aus:
   ```
   vercel login
   ```

3. Füge deinen OpenAI API-Schlüssel als Umgebungsvariable hinzu:
   - Gehe zu deinem Vercel-Dashboard
   - Wähle dein Projekt aus
   - Gehe zu "Settings" > "Environment Variables"
   - Füge `OPENAI_API_KEY` mit deinem API-Schlüssel hinzu

4. Deploye die Anwendung:
   ```
   vercel
   ```

5. Für Produktions-Deployments:
   ```
   vercel --prod
   ```

## Wichtige Dateien

- `src/App.tsx`: Hauptkomponente der Anwendung
- `server/server.js`: Backend-Server mit OpenAI-Integration
- `server/impressum.md`: Impressum (wird im Modal angezeigt)
- `server/datenschutz.md`: Datenschutzerklärung (wird im Modal angezeigt)
- `vercel.json`: Konfiguration für das Vercel-Deployment 