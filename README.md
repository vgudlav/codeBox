# Enterprise Application Developer Learning Lab

A Node.js + React interactive coding lab

## What is included

- **Express API** for challenge metadata and code evaluation
- **React + Vite frontend** with challenge selection, inline editor, and test run output
- **Beginner/Intermediate JS challenges** with starter code and visible examples

## Quick start

```bash
npm install
npm run dev --workspace server
npm run dev --workspace client
```

- API: `http://localhost:4000`
- Frontend: `http://localhost:5173`

## API endpoints

- `GET /api/health`
- `GET /api/challenges`
- `POST /api/challenges/:id/run` with body:

```json
{
  "code": "function solve(input) { return input; }"
}
```

## Notes

This is a starter lab architecture. You can extend it with:
- auth and progress tracking
- challenge authoring
- persistent submissions
- sandboxed runner with stricter security isolation


## Role-focused track

This lab now simulates the Uber-style enterprise developer role with hands-on exercises for:
- IAM and least-privilege automation
- Incident routing and escalation
- L3 triage and operational scripting

Each challenge includes structured test data to mirror production support patterns and admin ownership tasks.
