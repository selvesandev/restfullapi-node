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


