
# Real Time Chat App

Welcome to my chat app! I'm thrilled to introduce you to a next-generation, real-time chat application designed to unite people and enable seamless communication. Featuring an intuitive interface, robust features, and secure architecture.
## Tech stack

- Frontend: React.js, TailwindCSS, Daisy UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- Real-Time Messaging: Socket.io
## Features

- User Authentication: Secure user authentication system with JWT (JSON Web Tokens) ensures user login and access control.
- Interactive Interface: Enhanced user experience with a modern and visually appealing UI powered by TailwindCSS and Daisy UI.
- Global State Management: Utilized Zustand for effective global state management, ensuring seamless state updates across components.
- Real-Time Messaging: Enabled real-time messaging functionality through Socket.io, providing users with instant message delivery and a dynamic chat experience.
- Online User Status: Implemented online user status feature using Socket.io and React Context, allowing users to see the online status of other users.
- Notification Sound: Implemented notification sound feature to alert users when they receive a new message, enhancing user experience and responsiveness.
### Setup .env file

```js
PORT=...
MONGO_DB_URI=...
JWT_SECRET=...
NODE_ENV=...
```

### Build the app

```shell
npm run build
```
### Start the app

```shell
npm start
```
