# MERNG

## About the project

MERNG is a social network MVP that uses MongoDB (Mongoose ODM), Express (Apollo GraphQL) and Typescript (Node.js) for the server.
The server handles Posts (CRUD) and Users (LOGIN/REGISTER) resources through GraphQL queries.
On the client side, it is built with React/Typescript and Semantic-ui components. The routing is resolved with react-router and the requests and responses from the server are handled by GraphQL using Apollo-client.

### Home
![Alt text](frontend/public/MERNG-Home.png?raw=true "Home")

### Single post page
![Alt text](frontend/public/MERNG-SinglePostPage.png?raw=true "SinglePost")

### Single post page


## Setup

- Create a config.ts file on root directory that exposes this object
  const config = {
    PORT: 5000,
    MONGODB_URI: [yourmongoDBuri]
    SECRET_JWT_KEY: [somesecretkey],
    };
- On root folder run npm start
- On /frontend run npm start

### Tech stack

- MongoDB (Atlas)
- Express
- React
- Node.js / Typescript
- GraphQL (Apollo)

### Other libraries

- Mongoose ODM (connection between MongoDB and Express server)
- Bcryptjs (Crypt password)
- JWT (Encoded tokens)

### TODO

[] Deploy site on AWS
