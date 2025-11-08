# 🎯 Rimix - Smart Task Management Assistant

*A smart reminder app to organize your tasks and boost productivity.Set, manage, and get reminded with ease.*

[![Next.js](https://img.shields.io/badge/Next.js-13-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[Demo](https://rimix.vercel.app) · [Report Bug](https://github.com/AashishKumarSingh1/Rimix/issues) · [Request Feature](https://github.com/AashishKumarSingh1/Rimix/issues)

## ✨ What is Rimix?

Rimix is a cutting-edge task management application that leverages the power of:
- **Voice Recognition** for natural task creation
- **Smart Document Processing** for automated task extraction
- **Interactive Notifications** with custom alarms
- **Dynamic Theming** for optimal viewing experience
- **Responsive Design** for seamless cross-device usage

## 🌟 Features

- **Smart Voice Recognition**: Create reminders using natural speech
- **File Upload Processing**: Extract reminder details from text files
- **Interactive Notifications**: Custom alarm sounds and desktop notifications
- **Real-time Timer & Stopwatch**: Built-in time management tools
- **Dark/Light Theme**: Elegant UI with theme switching
- **Categories & Priorities**: Organize reminders with categories and priority levels
- **MongoDB Integration**: Persistent storage with Mongoose
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

- **Frontend**: Next.js, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **APIs**: Web Speech API, Web Audio API, Notifications API
- **State Management**: React Hooks

## 🔧 Core Components

### 1. Voice Recognition (`lib/speech.ts`)
- Natural language processing
- Date/time extraction
- Multiple format support

### 2. File Processing (`lib/fileUpload.ts`)
- Text content extraction
- Smart parsing
- Date format handling

### 3. Alarm System (`lib/alarm.ts`)
- Custom audio notifications
- Visual interaction game
- Multi-sensory feedback

### 4. Data Management (`lib/mongoose.ts`, `models/Reminder.ts`)
- MongoDB integration
- Type-safe models
- Efficient querying

## Backend API (MongoDB)

1) Create `.env.local` in the project root with:

```
NEXT_PUBLIC_MONGO_DB_URI="mongodb://localhost:27017/rimix"
```

2) Start MongoDB locally, then run the app with `npm run dev`.

### REST Endpoints

- `GET /api/reminders` — list reminders. Query params: `q`, `completed=true|false`, `page`, `limit`.
- `POST /api/reminders` — create reminder. Body: `{ title, description?, date?, time?, category?, priority? }`.
- `GET /api/reminders/:id` — get a reminder by id.
- `PUT /api/reminders/:id` — update fields in body.
- `PATCH /api/reminders/:id` — partial update (e.g., `{ completed: true }`).
- `DELETE /api/reminders/:id` — delete reminder.

Responses are JSON of the form `{ ok: boolean, data|error }`.

## Quick Start

### Prerequisites

```bash
# Node.js 16+ and npm
node --version
npm --version

# MongoDB running locally or cloud instance
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/AashishKumarSingh1/Rimix.git
cd rimix
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Create .env.local and add:
NEXT_PUBLIC_MONGO_DB_URI="your_mongodb_connection_string"
```

4. Start development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
rimix/
├── app/                    # Next.js 13 app directory
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main application page
│   └── api/               # API routes
│       └── reminders/     # Reminder endpoints
├── lib/                   # Core utilities
│   ├── alarm.ts          # Alarm system
│   ├── fileUpload.ts     # File processing
│   ├── http.ts           # API utilities
│   ├── mongoose.ts       # Database connection
│   └── speech.ts         # Voice recognition
├── models/               # Database models
│   └── Reminder.ts      # Reminder schema
└── public/              # Static assets
```

## Upcoming Development Tasks

- [ ] **Authentication**
  - Email/Password
  - OAuth integration
  - Role-based access
- [ ] **Team Features**
  - Shared reminders
  - Collaborative lists
  - Team notifications
- [ ] **AI Enhancements**
  - Smart categorization
  - Priority prediction
  - Natural language improvements
- [ ] **Mobile Apps**
  - React Native implementation
  - Push notifications
  - Offline support

## Contributing

We love contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##
<div align="center">

Made with ❤️ by [Aashish Kumar Singh](https://aashish-eight.vercel.app/)

If you found this project helpful, please give it a ⭐️!

</div>