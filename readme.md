# REST API WITH NODE JS
> Representation State Transfer.

* Stores and Fetches Data but does'nt use/render html
* Accepts request by the client(Browser/SPA/Android) and sends back response in HTTP verbs (GET,POST,PUT,PATCH,DELETE).
* Stateless Backends Meaning they don't care about the client that gets connected does not maintain session.
* Response/Request can be made in JSON/XML/URLEncoded/FormData etc.



### The Constraints that convert API to REST api are
* **Client-Server Architech**
(if we are building a restful api we have a clear separation of our frontend and backend)

* **Stateless**
(No  client Context (eg: session) is stored on the server. does not care about the client connecting to it)

* **Cacheability**
(should tell the client whether response can be cached or not this is kind of default going to be used don't have to be set explicitly.
but you can set the browser to cache the information and for how long should that be or you can forbid that completely 
if you data changes frequently)

* **Layered System**
(can be made in a layered system which means a client connects to the server but that server does'nt necessary be our final api which behind
the scene also reaches out to some other api)
* **Uniform Interface**
()
* **Code on Demand(optional)**
It does'nt have to be data it can also be some code that the client can execute.


#

### Features
````
/products (GET,POST)
/products/{id} (GET,PATCH,DELETE)
/orders (GET,POST)
/orders/{id} (GET,DELETE)

/authentication
````

#### Installation.
Initialize NPM
```
npm init
```

Install Express
```
npm install --save express
```


Create Server by creating a `server.js` and `app.js` file in the root directory
**app.js**
```
const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});

module.exports = app;
```
**server.js**
```
const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;//port where my project should run

const server = http.createServer(app);
server.listen(port);
```
Now run your server through terminal.
```
npm server.js
```

## Routes
We will have all our api routes in the `api` folder in our root directory.


#### structure (clone the project and view file for details)
```
    ./api/routes/products.js (will contain all our products related routes.)
    ./api/routes/orders.js (will contain all our order related routes)

```

#### Register your products.js route in your app(app.js)
```
const productRoutes = require('./api/routes/products');
app.use('/products', productRoutes); 
//meaning anything that starts with the /product uri should pass through products.js

const orderRoutes = require('./api/routes/orders');
app.use('/orders', orderRoutes);
```

## Error Handling and Development Helpers.
##### Prevent Server restart every time we change something with package called `nodemon`
```
npm install --save-dev nodemon
```
**Note** Nodemon is not globally available it is only available in our project where we installed it.  

add a npm command to start the server with nodemon. `package.json`
```
  "scripts": {
    "start": "nodemon server.js"
  },
```
**Now start the server with `npm start` command**

##### Also add a loggin package to log all the incoming request into our server. `morgan`
```npm install --save morgal```  
Now setup morgan to pass all our request through it `app.js`


##### Send Json Response on Error (Error Handling)
```app.js```
```
//If the request reaches at this point (check app.js for detail) we will create a 404 Not Found error message
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status=400;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


```

Now create a middleware to catch all the Errors. `app.js`
```
app.use((error, req, res, next) => {
    res.status(error.status || 500); //set the status code to the error code else 500
    res.json({
        error: {
            message: error.message //send the error message on json response
        }
    })
});
```


## Extract Body Of incomming Request
```
npm install --save body-parser (body parser does not support file)
```
**`app.js`**
```
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false})); //extended: true allows you to parse reach data 
//false to parse simple url encoded data
app.use(bodyParser.json()); //this will now extract json and url ecoded data.
```
eg:-
```

```

## Handling Cors (Cross Origin Request Sharing)
We can disable the cors by sending the right headers.  
Append a header to any response we send to the browser.
