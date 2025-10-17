# Podcast Platform

A modern podcast streaming platform built with Next.js frontend and Node.js/Express backend with MongoDB.

## Features

- 🎵 **Podcast Discovery**: Browse and discover podcasts by category
- 🎧 **Audio Player**: Integrated audio player with play/pause controls
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🔍 **Search & Filter**: Find episodes by title, host, or category
- ⭐ **Featured Episodes**: Highlighted episodes on the homepage
- 🎯 **Real-time Data**: Connected to MongoDB for dynamic content

## Tech Stack

### Frontend

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Custom Components** - Reusable UI components

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Rate Limiting** - API protection

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ThePodcastTask
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the backend directory:

   ```env
   MONGODB_URI=mongodb+srv://youssefabdelmaged50_db_user:6Lg0WCko3e1G7NST@cluster0.vbgcvao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   PORT=3001
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:3000
   ```

5. **Seed the database**

   ```bash
   cd backend
   npm run seed
   ```

6. **Start the backend server**

   ```bash
   npm start
   ```

7. **Start the frontend development server**

   ```bash
   cd frontend
   npm run dev
   ```

8. **Open your browser**
   Navigate to `http://localhost:3000`

## API Endpoints

### Episodes

- `GET /api/episodes` - Get all episodes with pagination
- `GET /api/episodes/featured` - Get featured episodes
- `GET /api/episodes/:id` - Get single episode
- `POST /api/episodes` - Create new episode
- `PUT /api/episodes/:id` - Update episode
- `DELETE /api/episodes/:id` - Delete episode

### Health Check

- `GET /health` - Server health status

## Database Schema

### Episode Model

```javascript
{
  title: String,
  description: String,
  hosts: String,
  duration: String,
  audioUrl: String,
  thumbnail: String,
  date: String,
  publishedAt: Date,
  isFeatured: Boolean,
  category: String,
  tags: [String],
  playCount: Number,
  rating: Number
}
```

## Project Structure

```
ThePodcastTask/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── Episode.js
│   │   └── Podcast.js
│   ├── routes/
│   │   └── episodes.js
│   ├── scripts/
│   │   └── seedData.js
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── app/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── types/
│   │   └── ui/
│   └── package.json
└── README.md
```

## Features Implemented

✅ **Backend Setup**

- MongoDB connection with Mongoose
- Express.js server with middleware
- RESTful API endpoints
- Error handling and validation
- Rate limiting and security

✅ **Database Integration**

- Episode and Podcast models
- Seeded with sample data
- Random audio URLs for testing
- Proper indexing for performance

✅ **Frontend Integration**

- Real API calls instead of dummy data
- Loading states and error handling
- Responsive design
- TypeScript support

✅ **Error Handling**

- Global error boundary
- API error responses
- User-friendly error messages
- Retry functionality

## Development

### Adding New Episodes

You can add new episodes through the API or by updating the seed script in `backend/scripts/seedData.js`.

### Customizing Audio URLs

Update the `audioUrls` array in the seed script to use your own audio files.

### Styling

The app uses Tailwind CSS. Modify the classes in the components to change the appearance.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
