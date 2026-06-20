# J.A.R.V.I.S.

A Jarvis-inspired AI voice assistant with a futuristic HUD interface. Speak or type to interact with an AI that responds in character as J.A.R.V.I.S.

## Features

- **Voice interaction** — Web Speech API for speech recognition and text-to-speech
- **AI conversation** — OpenAI-powered responses with Jarvis personality
- **Futuristic UI** — Dark holographic theme with animated core, visualizer, and system panels
- **Text fallback** — Type commands when voice isn't available
- **Real-time status** — Listening, processing, and speaking states

## Prerequisites

- Node.js 18+
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))
- Chrome or Edge (best Web Speech API support)

## Setup

1. Install dependencies:

```bash
npm install
cd server && npm install && cd ..
```

2. Configure your API key:

```bash
cp .env.example .env
```

Edit `.env` and set your `OPENAI_API_KEY`.

3. Start the app:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- **Tap the central core** to start/stop voice input
- **Type in the text field** and press SEND for text commands
- Jarvis will greet you on startup and respond via voice and text

## Project Structure

```
├── src/
│   ├── components/     # UI components (core, chat, visualizer)
│   ├── hooks/          # Speech and Jarvis logic
│   ├── services/       # API client
│   └── App.tsx         # Main layout
├── server/
│   └── index.js        # Express + OpenAI backend
└── package.json
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + backend |
| `npm run dev:client` | Frontend only (port 5173) |
| `npm run dev:server` | Backend only (port 3001) |
| `npm run build` | Production build |

## Browser Notes

Speech recognition requires a secure context (localhost works). Firefox has limited support — use Chrome or Edge for the best experience.
