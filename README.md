## Required for Heroku

### server.js

const PORT = process.env.PORT || 5000;

### package.json

{
"engines": {
"node": "8.1.1", // required for heroku
"npm": "5.6.0" // required for heroku
},
"scripts": {
"start": "node index.js", // required for heroku
"server": "nodemon index.js", // npm nodemon auto refresh express server
"client": "npm run start --prefix client", // go into client directory and run script
"dev" : "concurrently \"npm run server\" \"npm run client\"" // from npm concurrently -- will run both scrips at same time so you dont need 2 tabs...
},
}

