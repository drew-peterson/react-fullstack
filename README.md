## Required for Heroku

### server.js

const PORT = process.env.PORT || 5000;

### package.json

{
"engines": {
"node": "8.1.1",
"npm": "5.6.0"
},
"scripts": {
"start": "node index.js"
},
}
