# Book List App

A React web application that consumes the book-list-service from Choreo marketplace. The app allows users to view all books, add new books, update book status, and delete books.

## Features

- View a list of all books with their details
- Add new books with title, author, and reading status
- Update the reading status of books (Read, Currently Reading, Not Read Yet)
- Delete books from the list

## Technology Stack

- React.js for the frontend
- Bootstrap for styling
- Axios for API communication
- React Router for navigation
- Choreo for deployment and service integration

## Local Development

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure the `.env.development` file with your API URL and test key (if needed)
4. Start the development server:
   ```
   npm start
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment to Choreo

This application is designed to be deployed to Choreo as a Web App component. When deployed to Choreo:

1. Choreo will automatically build the React application using the appropriate buildpack
2. The app will be configured to use Choreo's Managed Authentication feature
3. The application will use the book-list-service from the Choreo marketplace via a Service Connection

### Deployment Steps

1. Push this repository to GitHub
2. In Choreo, create a new Web App component
3. Connect it to this repository
4. Configure the build settings (Node.js version, build command, output directory)
5. Enable Managed Authentication if needed
6. Create a connection to the book-list-service in the Marketplace
7. Deploy the application

## Available Scripts

- `npm start` - Run the app in development mode
- `npm test` - Run tests
- `npm run build` - Build the app for production
- `npm run eject` - Eject from Create React App (not recommended)

## API Integration

This application is designed to work with the book-list-service API which provides endpoints for:

- GET /books - List all books
- GET /books/{uuid} - Get a specific book by UUID
- POST /books - Add a new book
- PUT /books/{uuid} - Update a book's status
- DELETE /books/{uuid} - Delete a book
