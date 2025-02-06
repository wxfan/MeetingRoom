# Meeting Room Seat Allocation System

A system for managing meeting room seating arrangements and allocations.

## Project Structure

```
├── backend/          # Node.js/TypeScript backend server
│   ├── src/
│   │   ├── entities/ # Database entities (Seat, Person, MeetingRoom, etc)
│   │   ├── routes/   # API route handlers
│   │   └── controllers/ # Business logic controllers
├── frontend/         # Frontend application
├── testapi/          # API test scripts
└── README.md         # This document
```

## Technologies

### Backend
- TypeORM for database operations
- Express.js for REST API
- TypeScript
- PostgreSQL (configured in ormconfig.json)

### Frontend
[Add frontend technologies here]

## Getting Started

### Backend Setup
1. Install dependencies:
```bash
cd backend
npm install
```

2. Configure database connection in `ormconfig.json`

3. Run the development server:
```bash
npm run dev
```

4. Build production code:
```bash
npm run build
```

### Frontend Setup
1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm start
```

## API Testing
Use the `.http` files in `testapi/` with REST Client extension (VS Code) to test endpoints.
