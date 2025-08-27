# Book List Application

This is a React web application that consumes a book-list service from Choreo marketplace. The app allows users to view, add, update, and delete books from their reading list.

## Features

- View all books in the list
- Add new books with title, author, and read status
- Update the read status of books
- Remove books from the list

## Setup

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. Run `npm run build` to create a production build

## Deployment

This application is configured to be deployed on Choreo.

## Environment Variables

The application reads the Choreo service URL from the `window.configs` object that is injected by Choreo's managed authentication system.
