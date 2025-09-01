# Book List App

A React web application for managing a reading list. This application consumes the book-list-service from the Choreo marketplace.

## Features

- View all books in your reading list
- Add new books with title, author, and reading status
- Update the reading status of books (Unread, Reading, Read)
- Delete books from your list
- Search and filter books by title, author, or status

## Technology Stack

- React (with TypeScript)
- Material UI for components
- Axios for API communication
- React Context for state management

## Deployment in Choreo

This application is designed to be deployed as a Web Application component in Choreo. It will connect to the book-list-service API through Choreo's service connections.

### Configuration

The application reads its configuration from `/public/config.js`, which is mounted by Choreo at runtime with the appropriate service URL and API key values.

### Service Connection

This application connects to the book-list-service API using Choreo's managed service connections, which handle authentication and URL resolution automatically.

## Development

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Folder Structure

- `/src/components`: React components
- `/src/services`: API service layer for book-list-service
- `/src/context`: React context for state management
- `/src/types`: TypeScript type definitions
