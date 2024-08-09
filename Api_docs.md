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
