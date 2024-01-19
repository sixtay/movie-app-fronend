# Movie App

## Description

Movie App is a modern web application built with Next.js, leveraging Apollo Client to connect to a GraphQL API provided by a NestJS backend.

## Features

- Browse  for movies
- View information about each movie
- User authentication and authorization
- Responsive design for various devices

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sixtay/movie-app.git
   cd movie-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the environment variables:
   - Rename `.env.example` to `.env.local`
   - Update the variables in `.env.local` with your own values

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file.

- `HOST` - The host URL for the Next.js app (e.g., http://localhost:3000)
- `NEXTAUTH_URL` - The URL for NextAuth (e.g., http://localhost:3000)
- `NEXTAUTH_SECRET` - A secret key for NextAuth
- `NEXT_PUBLIC_API_URL` - The public GraphQL API URL (e.g., https://movie-app.scrumanac.com/graphql)
- `API_URL` - The GraphQL API URL (e.g., https://movie-app.scrumanac.com/graphql)

## Tech Stack

- **Client:** Next.js, Apollo Client
- **Server:** NestJS, GraphQL, MongoDB
- **Authentication:** NextAuth

## API Reference

### GraphQL API

The GraphQL API endpoint is used for all data-fetching operations in the application.

Endpoint: `${NEXT_PUBLIC_API_URL}`

### Queries

- `getAllMovies`: Fetch a list of movies
- `getMovieById`: Fetch details of a specific movie
- ... (more queries as per your API)

### Mutations

- `addMovie`: Add a new movie
- `updateMovie`: Update movie details

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Chukwuka Nnorukah - [nnorukah.c@gmail.com](mailto:nnorukah.c@gmail.com)

Project Link: [https://github.com/sixtay/movie-app-frontend](https://github.com/sixtay/movie-app-frontend)
