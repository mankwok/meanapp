# MEAN Application
This is an application to simulate a company intranet using MongoDB, Express.js,Angular and Node.js

## Functions
Functinos provided in the application:
1. User authentication
2. Backend user registration
3. ...

## Todo
Todo list:
1. Profile page
2. User permission control 
3. Post creation
4. Post reading
5. Post update
6. Post delete

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