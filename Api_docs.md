# API Documentation
### Users API
**Register User**
: /api/users/register

Method: POST
Description: Registers a new user in the system.

Request Body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

Responses:

201 Created:

```json
{
  "id": "integer",
  "username": "string",
  "email": "string"
}
```

400 Bad Request:

```json
{
  "errors": ["array of error messages"]
}
```

500 Internal Server Error:
```json
{
  "message": "Internal Server Error"
}
```

Login User
Endpoint: /api/users/login

Method: POST

Description: Logs in an existing user.

Request Body:

```json
{
  "email": "string",
  "password": "string"
}
```

Responses:

200 OK:
```json
{
  "access_token": "string"
}
```

400 Bad Request:
```json
{
  "message": "Email and password are required"
}
```

401 Unauthorized:
```json
{
  "message": "Invalid email or password"
}
```
500 Internal Server Error:

```json
{
  "message": "Internal Server Error"
}
```

Google Login
Endpoint: /api/users/google-login

Method: POST

Description: Logs in a user using Google OAuth.

Request Headers:

```json
{
  "google_token": "string"
}
```

Responses:

200 OK:

```json
{
  "access_token": "string"
}
```

500 Internal Server Error:
```json
{
  "message": "Internal Server Error"
}
```

Coins API
Fetch Coin Data
Endpoint: /api/coins/api/:coinId

Method: GET

Description: Fetches data for a specific cryptocurrency by its ID.

Request Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Request Parameters:

coinId (required): The ID of the coin to fetch.
Responses:

200 OK:
```json
{
  "id": "string",
  "name": "string",
  "symbol": "string",
  "current_price": "number",
  "market_cap": "number",
  "price_change_percentage_24h": "number"
  // Additional coin data
}
```
400 Bad Request:
```json
{
  "message": "coinId parameter is required"
}
```

500 Internal Server Error:
```json
{
  "message": "Failed to fetch coin data"
}
```

Fetch Coin List
Endpoint: /api/coins/api/list

Method: GET

Description: Fetches a list of all available cryptocurrencies.

Request Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Get Gemini Data
Endpoint: POST /gemini

Description: This endpoint allows you to fetch either market price data or suggestions related to cryptocurrencies using the Gemini API.

Request Body:

input (string): The input value for which you need the data (e.g., a cryptocurrency symbol).
type (string): The type of data to fetch. Must be either "price" or "suggestion".
Responses:

200 OK: Returns the requested data in JSON format.
Example response for "price" type:

```json
{
  "symbol": "BTCUSD",
  "price": "45000.00"
}
```

Example response for "suggestion" type:

```json
{
  "suggestions": [
    "BTC",
    "ETH",
    "LTC"
  ]
}
```

400 Bad Request: If the type parameter is invalid.
Example response:
```json
{
  "message": "Invalid type. Please specify 'price' or 'suggestion'."
}
```
500 Internal Server Error: If there is an error processing the request.

Example response:
```json
{
  "message": "Internal Server Error"
}
```

Example Request:

```json
{
  "input": "BTCUSD",
  "type": "price"
}
```

Endpoint: GET /api/news/digital-currencies

Description: This endpoint fetches the latest news articles related to cryptocurrencies using the NewsAPI.

Parameters:

No parameters are required.
Responses:

200 OK: Returns a list of news articles in JSON format.
Example response:
```json
[
  {
    "source": {
      "id": "bbc-news",
      "name": "BBC News"
    },
    "author": "John Doe",
    "title": "Bitcoin Hits New High",
    "description": "Bitcoin reaches a new all-time high as investors flock to digital currencies.",
    "url": "https://www.bbc.com/news/technology-56114508",
    "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/12F1B/production/_116858620_gettyimages-1230932140.jpg",
    "publishedAt": "2024-08-09T09:00:00Z",
    "content": "Bitcoin has surged to a new record high..."
  }
  // more articles
]
```
500 Internal Server Error: If there is an error fetching the news.
Example response:
```json
{
  "message": "Error fetching news"
}
```
Example Request:

GET /api/news/digital-currencies