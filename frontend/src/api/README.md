# API Spec (for backend)

This app expects the following endpoints. All responses should use JSON and wrap payloads in `{ data, success, message?, pagination? }`.

Base URL: `NEXT_PUBLIC_API_URL` (defaults to `http://localhost:3001/api`).

## Episodes

- GET `/episodes/featured`

  - Description: Latest highlighted episodes for the home page.
  - Response `200`:
    {
    "success": true,
    "data": [
    {
    "id": "1",
    "title": "O que é um bom código?",
    "hosts": "Diego e Richard",
    "date": "8 Jan 21",
    "duration": "1:35:18",
    "thumbnail": "/assets/thumbnail.png",
    "audioUrl": "https://cdn.example.com/podcasts/1.mp3"
    }
    ]
    }

- GET `/episodes`

  - Query params: `page?`, `limit?`, `query?`, `category?`, `sortBy?`
  - Response `200`:
    {
    "success": true,
    "data": {
    "items": [
    {
    "id": "3",
    "title": "A vida é boa",
    "hosts": "Tiago, Diego e Pellizzetti",
    "date": "8 Jan 21",
    "duration": "1:35:18",
    "thumbnail": "/assets/thumbnail.png",
    "audioUrl": "https://cdn.example.com/podcasts/3.mp3"
    }
    ],
    "pagination": { "page": 1, "limit": 12, "total": 100, "totalPages": 9 }
    }
    }

- GET `/episodes/:id`
  - Response `200`:
    {
    "success": true,
    "data": {
    "id": "3",
    "title": "A vida é boa",
    "hosts": "Tiago, Diego e Pellizzetti",
    "date": "8 Jan 21",
    "duration": "1:35:18",
    "thumbnail": "/assets/thumbnail.png",
    "audioUrl": "https://cdn.example.com/podcasts/3.mp3"
    }
    }

## Error format

- Non-2xx:
  { "success": false, "message": "Validation error.", "data": null }

## Notes

- `duration` is a string (`HH:MM:SS` or `MM:SS`).
- `audioUrl` should be a direct URL to the audio file (CORS enabled).
- Thumbnails can be relative (served by Next static) or absolute URLs.

