# RnD

## Overview

This project consists of a frontend and a backend. The frontend is built with [React] and the backend is built with [Node.js/Express/Redis/MongoDB]. You can run both the frontend and backend locally, or you can run them together in Docker containers.

## Prerequisites

Before running the project locally or in Docker, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended version: v18+)
- [Docker](https://www.docker.com/get-started)

## More information

Find the detailed information in respective folders

- [Frontend](./frontend/README.md)
- [Backend](./backend/Readme.md)

## Running Locally

1. Run in local

Before running the project locally spin the mongodb and redis docker containers
In backend folder

```bash
docker-compose up --build -d
```

2. Accessing the site

Frontend

```bash
http://localhost:5173/
```

Backend

```bash
http://localhost:5001/
```

3. Run e2e test

Once local is up and running

```bash
cd e2e
npm install
npm run test
```
