# Meeting Room Seat Allocation System

A system for managing meeting room seating arrangements and allocations.

## Project Structure

```
├── backend/          # Node.js/TypeScript backend server
│   ├── src/
│   │   ├── entities/ # Database entities (Seat, Person, MeetingRoom, etc)
│   │   ├── routes/   # API route handlers
│   │   └── controllers/ # Business logic controllers
├── testapi/          # API test scripts
└── README.md         # This document
```

## Technologies

- TypeORM for database operations
- Express.js for REST API
- TypeScript
- PostgreSQL (configured in ormconfig.json)

## Getting Started

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

## API Testing
Use the `.http` files in `testapi/` with REST Client extension (VS Code) to test endpoints.
