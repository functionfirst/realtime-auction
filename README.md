# Real-time Auctions

A simple real-time auction system

## Disclaimer

This repo is a playground for me to experiment and develop my skills. The project is not intended to be deployed as a "real" application though you are very welcome to use it.

## Setup

1. Install node modules with yarn

   `yarn install`

2) Copy client and server .env files

   `cp client/.env_example client/.env && cp server/.env_example server/.env`

3) Ensure CORS_ALLOWED_LIST in `server/.env` matches the URL of the client

4) Ensure VUE_APP_API_HOST in `client/.env` matches the URL of the API server

5) Start the client and server in dev mode

   `yarn start`

## Seeding the database

Populate MongoDB with default test users, an admin account and a sample auction

`yarn seed`

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
