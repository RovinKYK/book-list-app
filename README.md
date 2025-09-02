# Book List App

A React application that consumes the book-list-service from Choreo marketplace. This app allows users to manage their reading list by adding, updating, and deleting books.

## Features

- View all books in your reading list
- Add new books with title, author, and reading status
- Update reading status (To Read, Currently Reading, Finished Reading)
- Delete books from your list
- Responsive design using Bootstrap

## Technologies Used

- React 18
- TypeScript
- Vite
- React Router
- Bootstrap 5
- Axios for API calls
- Choreo for deployment and service integration

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file with the following variables:
   ```
   VITE_API_BASE_URL=http://localhost:8080
   VITE_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Building for Production

```
npm run build
```

## Choreo Deployment

This application is configured for deployment on Choreo using the provided Dockerfile. When deploying, make sure to:

1. Set up the environment variables in Choreo:
   - VITE_API_BASE_URL - The URL of the book-list-service
   - VITE_API_KEY - The API key for accessing the service

2. Enable managed authentication if you want to secure your application with Choreo's built-in authentication system.

3. Create a connection to the book-list-service in the Choreo marketplace.

## Project Structure

- `/src/components` - React components
- `/src/services` - API services
- `/src/types` - TypeScript interfaces
- `/public` - Static assets
```
