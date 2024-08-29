# 4Devs

## Description
The app is a social network for developers. It allows users to connect, make posts and discuss about projects.
Users can also show their skills and build a strong network of techies.

## Tech stack
- Node.js
- NPM for package management
- NextJS 14
- Tailwind CSS
- PostGreSQL with Prisma
- Docker 

## Getting started
To run the app locally, you should first set environment variables according .env_examples.
Make sure to fill all variables with suitable values.

Then install the app:
```
npm install
```

After set everything, you can run start docker service by running in the root folder :
```
docker-compose up
```
Finally, start the pp in dev mode:
```
npm run dev
```
## Project structure
Project is organized as follows:

- prisma: containing schema and info about migrations
- public: to store assets locally
- src: to store all source files



