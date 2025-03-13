import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Für Vercel: Bestimme den Pfad zum Stammverzeichnis
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Stelle die Markdown-Dateien bereit
app.use('/server', express.static(path.join(rootDir, 'server')));

// Stelle die statischen Dateien aus dem dist-Verzeichnis bereit (für Produktion)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(rootDir, 'dist')));
}

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Routes
app.post('/api/generate-strategies', async (req, res) => {
  try {
    const { profile, product } = req.body;
    
    console.log('Received request with profile and product:', { 
      profileId: profile?.id, 
      productId: product?.id
    });
    
    if (!profile || !product) {
      return res.status(400).json({ error: 'Profile and product are required' });
    }

    // Create a prompt for OpenAI
    const promptText = `
    Verwende diesen Lebenslauf mit diesem Produkt und finde die passenden Verkaufsstrategien.
    
    Kundenprofil:
    - Name: ${profile.name}
    - Position: ${profile.title} bei ${profile.company}
    - Erfahrung: ${profile.experience}
    - Ausbildung: ${profile.education}
    - Interessen: ${profile.interests.join(', ')}
    - Erfolge: ${profile.achievements.join(', ')}
    - Schmerzpunkte: ${profile.painPoints.join(', ')}
    - Budget: ${profile.budget}
    - Entscheidungsfindung: ${profile.decisionMaking}
    
    Produktinformationen:
    - Name: ${product.name}
    - Beschreibung: ${product.description}
    - Funktionen: ${product.features.join(', ')}
    - Vorteile: ${product.benefits.join(', ')}
    - Preisgestaltung: ${product.pricing}
    `;

    console.log('Sending request to OpenAI with prompt');

    // Call OpenAI API with the new responses.create method
    const response = await openai.responses.create({
      model: "gpt-4.5-preview",
        input: [
        {
          "role": "system",
          "content": [
            {
              "type": "input_text",
              "text": "Du bist ein Sales Assistant"
            }
          ]
        },
        {
          "role": "user",
          "content": [
            {
              "type": "input_text",
              "text": promptText
            }
          ]
        }
      ],
      text: {
        "format": {
          "type": "json_schema",
          "name": "sales_strategies",
          "strict": true,
          "schema": {
            "type": "object",
            "properties": {
              "strategies": {
                "type": "array",
                "description": "A list of sales strategies.",
                "items": {
                  "type": "object",
                  "properties": {
                    "title": {
                      "type": "string",
                      "description": "The title of the sales strategy."
                    },
                    "approach": {
                      "type": "string",
                      "description": "Description of the approach being taken."
                    },
                    "talkingPoints": {
                      "type": "array",
                      "description": "Key talking points for the sales strategy.",
                      "items": {
                        "type": "string"
                      }
                    },
                    "openingMessage": {
                      "type": "string",
                      "description": "The opening message to initiate conversation."
                    }
                  },
                  "required": [
                    "title",
                    "approach",
                    "talkingPoints",
                    "openingMessage"
                  ],
                  "additionalProperties": false
                }
              }
            },
            "required": [
              "strategies"
            ],
            "additionalProperties": false
          }
        }
      },
      reasoning: {},
      tools: [],
      temperature: 1,
      max_output_tokens: 10000,
      top_p: 1,
      stream: false,
      store: true
    });

    console.log('Received response from OpenAI:', JSON.stringify(response, null, 2));

    // Extrahiere die Strategien aus der Antwort
    if (!response.text) {
      throw new Error('Keine Antwort vom OpenAI-Server erhalten');
    }

    // Prüfe, ob response.text bereits ein Objekt oder ein String ist
    let strategies;
    try {
      if (typeof response.text === 'string') {
        // Wenn es ein String ist, parse es als JSON
        strategies = JSON.parse(response.text);
      } else {
        // Wenn es bereits ein Objekt ist, verwende es direkt
        strategies = response.text;
      }
      
      console.log('Parsed strategies:', strategies);
      
      // Stelle sicher, dass die Antwort im richtigen Format ist
      if (!strategies.strategies && typeof strategies === 'object') {
        // Wenn strategies kein strategies-Feld hat, aber ein Objekt ist,
        // packe es in ein strategies-Feld
        strategies = { strategies: [strategies] };
      }

      // Wenn strategies ein format-Feld hat, aber kein strategies-Feld,
      // erstelle ein Fallback-Objekt
      if (strategies.format && !strategies.strategies) {
        console.log('Response has format field but no strategies field, using fallback');
        strategies = {
          strategies: [{
            title: "Fallback-Strategie",
            approach: "Es gab ein Problem bei der Generierung der Strategien. Hier ist eine einfache Fallback-Strategie.",
            talkingPoints: ["Kontaktieren Sie den Kunden direkt", "Stellen Sie Fragen zu seinen Bedürfnissen", "Präsentieren Sie die Vorteile des Produkts"],
            openingMessage: "Hallo, ich würde gerne mehr über Ihre Bedürfnisse erfahren."
          }]
        };
      }

      // Extrahiere den output_text aus der Antwort und versuche ihn zu parsen
      if (response.output_text) {
        try {
          const outputTextObj = JSON.parse(response.output_text);
          if (outputTextObj.strategies && Array.isArray(outputTextObj.strategies)) {
            console.log('Using strategies from output_text');
            strategies = outputTextObj;
          }
        } catch (e) {
          console.error('Error parsing output_text:', e);
        }
      }
    } catch (error) {
      console.error('Error parsing strategies:', error);
      // Fallback: Erstelle ein einfaches Strategieobjekt
      strategies = {
        strategies: [{
          title: "Fallback-Strategie",
          approach: "Es gab ein Problem bei der Generierung der Strategien. Hier ist eine einfache Fallback-Strategie.",
          talkingPoints: ["Kontaktieren Sie den Kunden direkt", "Stellen Sie Fragen zu seinen Bedürfnissen", "Präsentieren Sie die Vorteile des Produkts"],
          openingMessage: "Hallo, ich würde gerne mehr über Ihre Bedürfnisse erfahren."
        }]
      };
    }
    
    // Sende die Strategien an den Client
    res.json(strategies);
  } catch (error) {
    console.error('Error generating strategies:', error);
    res.status(500).json({ error: 'Failed to generate strategies', details: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Catch-all route für SPA (Single Page Application)
app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(rootDir, 'dist', 'index.html'));
  } else {
    res.status(404).send('Not found in development mode');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 