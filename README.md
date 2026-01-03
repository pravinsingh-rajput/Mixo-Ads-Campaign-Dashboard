# Mixo Campaign Dashboard

Campaign monitoring dashboard with real-time metrics streaming.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS 4
- @tanstack/react-table
- Server-Sent Events (SSE) for real-time updates

## Features

- Campaign overview with status cards
- Real-time metrics streaming
- Paginated data table
- Campaign detail popup with metrics grid

## API

Base: `https://mixo-fe-backend-task.vercel.app/`

- `GET /campaigns/insights` - Aggregate metrics
- `GET /campaigns` - All campaigns
- `GET /campaigns/{id}` - Campaign details
- `GET /campaigns/{id}/insights` - Campaign metrics
- `GET /campaigns/{id}/insights/stream` - SSE stream
