# Flight Offer Search Engine

This project is a proof-of-concept (POC) for a flight offer search engine using Amadeus API with an Express.js backend and an Angular frontend in Nx workspace.

## Prerequisite

Make sure you have Node.js installed.

## Setup

1. Clone the repository:

```
git clone <repository_url>
cd <project_directory>
```

2. Install dependencies:

```
npm install

```

3. Set up environment variables:

- Rename .env.copy to .env in project root.
- Add your Amadeus API client ID and client secret to the .env file.

## Running the Application

### Client (Angular)

To start the Angular development server:

```
npx nx serve client
```

Navigate to http://localhost:4200/ in your browser.

### Server (Express.js)

To start the Express.js server:

```
npx nx serve server
```

The backend server will run on http://localhost:1338/.

## Usage

- Access the frontend application in your browser and use the flight search functionality provided.
- Ensure the backend server is running to handle API requests to Amadeus.

## Notes

- This project is a demonstration and may require further development for production use.
- Securely manage your Amadeus API credentials and environment variables.
