PROJECT OVERVIEW
This project is a collaborative real-time note editor built with React. Users can log in and edit content collaboratively, with live updates via WebSocket. It provides a simple and intuitive user interface for creating and editing notes. The application is designed to be secure, with token-based authentication and session validation.

SETUP INSTRUCTIONS
Follow the steps below to set up and run the application locally:

Clone the repository,
npm install

Set up the backend:

The backend runs on http://localhost:5000. Make sure you have the backend server set up and running.
If you don't have it, you can create an Express server to handle authentication and WebSocket connections.

Start the application:
npm run dev
The application will be available at http://localhost:5173.

Login:

Open the app in the browser, and you will be redirected to the login page. Enter one of the following credentials to log in:
Username: user1, Password: password1
Username: user2, Password: password2.
If successful, you'll be redirected to the editor.

TECHNOLOGY STACK
Frontend:

React
Redux (for state management)
React-Quill (rich text editor)
React Router (for routing)
Axios (for HTTP requests)
WebSocket (Socket.io for real-time collaboration)

FEATURES IMPLEMENTED
User Authentication:

Login page where users can authenticate with their username and password.
Token-based authentication with automatic login if a valid token exists in local storage.
Real-time Collaborative Editing.
WebSocket connection with Socket.io to allow multiple users to edit the same note simultaneously.
Real-time updates reflected in the editor and saved automatically.
Content Syncing.
When a user starts editing, the content is emitted to other connected clients.
Initial content is fetched from the server and synced with the client when the editor is loaded.
Editor Interface.
A rich text editor using React-Quill, supporting text formatting, lists, links, and images.
A preview of the content on the same page.
Connection Monitoring.
Displays a modal when the connection to the WebSocket server is lost, alerting the user.

FUTURE IMPROVEMENTS
User Management:

Implement features like user registration.
Add sign-up functionality to allow users to create new accounts.
Implement log-out functionality to securely log users out and clear session data.

Persistent Storage:
Integrate persistent storage for notes, either in a database or a cloud storage service (e.g., AWS S3).

Better Error Handling:
Improve the error handling mechanism in the frontend and backend.

Multiple Notes Support:
Extend the app to allow users to work with multiple notes, not just one.
Implement a list or dashboard where users can view, create, edit, and delete multiple notes

Enhanced Editor Features:
Add more rich text editing features such as tables, code syntax highlighting, and custom styling.

Styling and Responsiveness:
Improve the app's design, making it more responsive across devices.
