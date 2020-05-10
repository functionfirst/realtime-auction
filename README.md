# Real-time Auctions  
A simple real-time auction system

## Server Setup

1. Change directory to server

  ```cd server```

2. Copy .env_example and rename it to .env

```cp .env_default .env```

3. Install node modules

```npm install```

4. Ensure CORS_ALLOWED_LIST in .env file matches the URL of your front-end application

5. Run local development server using nodemon

```npm run watch```

### Seed Data
Populates the MongoDB with default test users, an admin account and a sample auction

```npm run seed```

## App Setup

1. Change directory to app

```cd app```

2. Copy .env_example and rename it to .env

```cp .env_default .env```

3. Install node modules

```npm install```

4. In .env ensure VUE_APP_API_HOST matches the URL of your API server

5. Run local development server

```npm run serve```  

#### Auction Data

```
Name: Dummy Auction
Start Date: today
EndDate: today + 3
Description: This is some dummy auction content
Start Amount: 100
```

#### User Accounts
```
Name: Admin
Email: admin
Password: admin
```
```
Name: Player 1
Email: player1
Password: demo
```
```
Name: Player 2
Email: player2
Password: demo
```
