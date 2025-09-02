# Book List App

A React web application that consumes the book-list-service from Choreo marketplace. This app allows users to create, read, update, and delete books in a reading list.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and designed to be deployed to Choreo.

## Features

- View all books in your reading list
- Filter books by status (unread, reading, read)
- Add new books to your list
- Update the status of books
- Delete books from your list

## Tech Stack

- React
- Material-UI for styling
- Axios for API requests

## Deployment on Choreo

This app is designed to be deployed as a Web App component in Choreo with the following configuration:

1. Use React buildpack
2. Set the port to 3000 (default React port)
3. Enable Managed Authentication to securely connect to the book-list-service
4. Create a connection to the book-list-service in the Choreo Marketplace

### Choreo Deployment Steps

1. Push this codebase to a Git repository
2. In Choreo, create a new Web App component
3. Connect the repository and branch
4. Configure the buildpack as React
5. Enable Managed Authentication
6. Deploy the component
7. Create a connection to the book-list-service from the Choreo Marketplace

## Local Development

### Prerequisites

- Node.js (version 16 or higher)
- npm (version 7 or higher)

### Setup

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following environment variables:

```
REACT_APP_API_URL=<your_api_url>
REACT_APP_API_KEY=<your_api_key>
```

### Choreo Specific Notes

- The app uses Choreo's managed authentication to securely connect to the book-list-service.
- The `public/config.js` file is used to configure the API URL in the Choreo environment.
- When deployed to Choreo, the API requests are sent to `/choreo-apis/book-list-service` which is the path that Choreo uses for the connected service.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

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

For deployment to Choreo, see the "Deployment on Choreo" section above.

For other deployment options, check out the Create React App documentation: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
