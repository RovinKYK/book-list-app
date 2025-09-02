# Book Collection App

This is a React web application for managing a collection of books. It consumes the book-list-service API from Choreo Marketplace and provides a beautiful, user-friendly interface for browsing, adding, editing, and deleting books.

## Features

- Browse a list of books with search functionality
- View detailed information about each book
- Add new books to the collection
- Edit existing book details
- Delete books from the collection
- Responsive design that works on mobile and desktop

## Tech Stack

- React with TypeScript
- React Router for navigation
- Material-UI for a modern, responsive UI
- Axios for API communication
- Environment variables for configuration

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Deployment to Choreo

### Prerequisites

- Choreo account
- Access to Rovin Test project in Choreo

### Deployment Steps

1. Push your code to GitHub:
   ```
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. In the Choreo console:
   - Create a new Web Application component
   - Connect to your GitHub repository
   - Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `build`
     - Node.js Version: 16 (or your preferred version)
   - Deploy the application

3. Configure environment variables in Choreo:
   - Add `REACT_APP_API_URL` and `REACT_APP_TEST_KEY` with appropriate values

4. Access your deployed application through the URL provided by Choreo

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
