# MEAN Application
This is an application to simulate a company intranet using MongoDB, Express.js,Angular and Node.js

## Functions
Functinos provided in the application:
1. User authentication
2. Backend user registration
3. Forum
4. Manage rquest items
5. Activity management 

## Environment
1. NodeJs
2. Angular 2+
3. MongoDB

## Installation
1. Clone the repo and install dependencies of API server:
  ```
  $ git clone https://github.com/mankwok/meanapp.git
  $ cd meanapp
  $ npm install
  ```
2. Install dependencies of Angular application:
```
$ cd angular-app/
$ npm install
```
3. Setup Mongodb (Change the mongodb config in ./config/database.js)
```js
module.exports = {
    uri: '', //mongodb connection string uri
    secret: crypto,
    option: {
        auth: {
            user: '', //mongodb user
            password: '' //mongodb password
        }
    }
}
```

## To Run The Application
- For development:
1. Run API Server:
```
$ npm run devstart
```
2. Run Angular Application:
```
$ cd angular-app/
$ ng serve
```

## License
MIT.