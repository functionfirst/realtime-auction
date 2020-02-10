# Real-time Auctions

## Configuration
Copy config_default.js and rename it to config.js
```cp .env_default .env```

## Setup
1. Create a copy of config_default.js, naming it as config.js
```cp config_default.js config.js```
2. Install node modules
```npm install```
3. Install client-side libraries (See below for errors)
```bower install```
4. Start the default application task (Uses Nodemon)
```gulp```
## Seed Data
Populate the MongoDB with default test users, an admin account and a sample auction
```npm run seed```
## Bower Installation problems***
Currently .bowerrc attempts to deploy client-side libraries to /public/assets/lib/
You may encounter permission problems preventing bower writing to this folder.
### Quick Fix
1. Temporarily rename .bowerrc using ```mv .bowerrc > _.bowerrc```
2. Re-Run `bower install`
3. Manually move contents of `bower_components` to `public/assets/lib/`
