# Book List App

A React web application that consumes the book-list-service from Choreo marketplace and allows users to manage their book collection.

## Features

- View all books in your collection
- Add new books with title, author, and reading status
- Edit book details and update reading status
- View individual book details
- Delete books from your collection

## Technology Stack

- React 18
- Material UI for component styling
- React Router for navigation
- Axios for API calls
- Choreo for deployment and service connections

## Deployment

This application is designed to be deployed to Choreo with managed authentication enabled.

### Prerequisites

- Node.js 18 or later
- A Choreo account with access to the book-list-service

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

#### `npm run build`

Builds the app for production to the `build` folder.

### Choreo Deployment Instructions

1. **Create Web Application Component (already done)**
   - Name: Book List Web App
   - Repository: https://github.com/RovinKYK/book-list-app.git
   - Branch: main
   - Build Pack Language: React
   - Enable Managed Auth: Yes
   - Port: 3000
   - Build Command: npm run build
   - Output Directory: build

2. **Create Connection to Book-List-Service (already done)**
   - Connection Name: book-list-service-connection

3. **Configure API URL**
   - Navigate to the Configurations section in the Deploy view
   - Create a file mount configuration with:
     - Name: API_CONFIG
     - File Mount Path: /app/public/config.js
     - Content for Development:
       ```
       window.configs = {
         apiUrl: '/choreo-apis/api/v2',
       };
       ```
     - Content for Production:
       ```
       window.configs = {
         apiUrl: '/choreo-apis/rovintest/book-list-service/v1',
       };
       ```

4. **Create Test Users for Authentication**
   - In the Choreo Console, go to Settings > Test Users
   - Create a new test user with your preferred credentials

5. **Build and Deploy**
   - Trigger a build from the "Build" section
   - After a successful build, deploy to the Development environment
   - Test the application to ensure it works correctly
   - Promote to Production when ready

6. **Testing the Deployment**
   - Access the application via the provided URL
   - You will be prompted to log in using the test credentials
   - After logging in, you should be able to view, add, edit, and delete books

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
