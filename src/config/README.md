# Configuration

This directory contains configuration files for the application.

## API Configuration (`api.ts`)

The API configuration centralizes all API-related settings and provides helper functions for making API requests.

### Environment Variables

- `REACT_APP_API_BASE_URL`: The base URL for the API server (default: `http://localhost:3001/api`)

### Usage

```typescript
import { buildApiUrl, apiRequest } from '../config/api';

// Build a URL
const url = buildApiUrl('/books'); // Returns: http://localhost:3001/api/books

// Make an API request with error handling
const response = await apiRequest('/books', {
  method: 'POST',
  body: JSON.stringify(data)
});
```

### Configuration Options

- `BASE_URL`: The base URL for API requests
- `TIMEOUT`: Request timeout in milliseconds (10 seconds)
- `RETRY_ATTEMPTS`: Number of retry attempts for failed requests (3)

## Environment Setup

1. Copy `.env.example` to `.env`
2. Update the values in `.env` for your environment
3. Restart the application to pick up new environment variables

### Required Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `REACT_APP_API_BASE_URL`: API server URL
- `REACT_APP_ADMIN_USERNAME`: Admin login username
- `REACT_APP_ADMIN_PASSWORD`: Admin login password
