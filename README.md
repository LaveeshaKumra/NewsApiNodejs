# News Preferences API

This project is a RESTful API built with Node.js and Express.js, designed to handle user registration, login, and manage user preferences for news categories. It uses JWT for authentication and bcrypt for password hashing. The API allows users to manage their news preferences and fetch news articles based on those preferences.

## Features

- User registration and login with JWT authentication.
- Update and retrieve user preferences.
- Fetch news articles based on user preferences.
- JWT token reissue upon preferences update to reflect the latest data.

## Prerequisites

- [Node.js](https://nodejs.org/) 
- An API key from [NewsAPI](https://newsapi.org/) (or any other news API service)

## Project Structure

- `index.js`: Entry point for the application.
- `controllers/`: Contains controller files for handling requests.
  - `authController.js`: Handles user authentication.
  - `preferenceController.js`: Manages user preferences.
  - `newsController.js`: Fetches news articles.
- `models/`: Contains models for data storage.
  - `userModel.js`: In-memory user storage.
- `routes/`: Defines API routes.
  - `authRoutes.js`: Routes for user authentication.
  - `preferenceRoutes.js`: Routes for user preferences.
  - `newsRoutes.js`: Routes for fetching news articles.
- `utils/`: Utility files for middleware and validation.
  - `authMiddleware.js`: Middleware for JWT authentication.
  - `validation.js`: Input validation for registration and preferences.
- .env file : adding the details for testing purpose

## Setup and Installation

1. **Clone the Repository:**

   ```bash
   git clone [https://github.com/LaveeshaKumra/news-api-project2](https://github.com/LaveeshaKumra/NewsApiNodejs/)
   cd NewsApiNodejs

2. **Install Dependencies:** 
    npm install

3. **Create a .env File:** (For testing purpose , I am adding those)
    JWT_SECRET=a1d79aa1454a16ad6d72c8957d343351ad6f3674b0adf1cc7e254d0e567da005
    API_KEY=876c9aa2843e42b88351c7c64332bacc

4. **Run the Application:**
    nodejs index.js
    application will start on http://localhost:3000

------------------------------------------------------------------------------
**API Endpoints**
------------------------------------------------------------------------------
1. User Registration
URL: /auth/register
Method: POST
Description: Register a new user.
Request Body:
{
    "username": "laveesha",
    "password": "123456"
}
Response :
{
    "message": "User registered successfully."
}
------------------------------------------------------------------------------
2. Login User
URL: /auth/login
Method: POST
Description: Log in an existing user and receive a JWT token.
Request Body:
{
    "username": "laveesha",
    "password": "123456"
}
Response :
{
    "token": "your_jwt_token"
}
------------------------------------------------------------------------------
3. Update Preferences
URL: /preferences
Method: PUT
Description: Update the news preferences for the logged-in user.
I am updating the jwt token here as , initial jwt token had preferences=[] 
Request Body:
{
    "preferences": ["movies", "comics", "games"]
}
Headers : 
authorization : "your_jwt_token"
Response:
{
    "preferences": ["movies", "comics", "games"],
    "token": "your_new_jwt_token"
}

------------------------------------------------------------------------------
4. Retrieve Preferences
URL: /preferences
Method: GET
Description: Retrieve the news preferences for the logged-in user.
Headers : 
authorization : "your_new_jwt_token"
Response:
{
    "preferences": ["movies", "comics", "games"]
}

------------------------------------------------------------------------------
5. Fetch News
URL: /news
Method: GET
Description: Fetch news articles based on the logged-in user's preferences.
Headers : 
authorization : "your_new_jwt_token"
Response:
{
    "news":"json-data-news"
}

------------------------------------------------------------------------------
