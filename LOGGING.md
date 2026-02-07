# User Interaction Logging Guide

This project includes a logging system that tracks when users click "Yes" or "No" on the Valentine's Day proposal app.

## How It Works

- When a user clicks "Yes" or "No", the app sends a request to a backend Express server
- The server logs the interaction with a timestamp and other metadata
- All logs are saved to `/workspaces/Valentines-WebApp/interaction_log.json` in the root folder

## Running the Project with Logging

### Option 1: Run Both Server and Frontend Together
```bash
npm run dev:all
```
This will start:
- Backend server on `http://localhost:3001`
- Frontend on `http://localhost:5173`

### Option 2: Run Separately
Terminal 1 - Start the backend server:
```bash
npm run server
```

Terminal 2 - Start the frontend:
```bash
npm run dev
```

## Log File Format

The `interaction_log.json` file in the root folder contains an array of log entries:

```json
[
  {
    "timestamp": "2026-02-07T10:30:45.123Z",
    "action": "yes",
    "userAgent": "Mozilla/5.0..."
  },
  {
    "timestamp": "2026-02-07T10:31:20.456Z",
    "action": "no",
    "userAgent": "Mozilla/5.0..."
  }
]
```

## API Endpoints

The server provides the following endpoints:

- **POST /api/log** - Log an interaction
  - Body: `{ "action": "yes" | "no" }`
  - Returns: `{ "success": true, "message": "...", "entry": {...} }`

- **GET /api/logs** - Retrieve all logs
  - Returns: Array of all logged interactions

- **GET /api/health** - Health check
  - Returns: `{ "status": "ok" }`

## Viewing Logs

You can view the logs by:

1. Opening the `interaction_log.json` file directly in the root folder
2. Making a GET request to `http://localhost:3001/api/logs`

## Notes

- The server must be running for logging to work
- If the server is not available, the app will continue to work normally but interactions won't be logged
- Each user's browser will send its user agent information with the log for tracking purposes
