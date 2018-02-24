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


## MongoDB and Mongoose.
Adding MongoDb as our database and mongoose as a package to
work with that database(store,get,update etc).

#### Install MongoDB (Mongo DB Atlas database as a service.)
1) To download mongo db in your system you can click the. > solution and > try it now options
2) But we are going to use mongodb atlas (It is a mongo db database in the cloud managed by the company
behind mongo db behind the scene it is hosted on AWS)
3) So go to go started for free section [Atlas](https://www.mongodb.com/cloud/atlas)
4) Build you new cluster. [keep](https://keep.google.com) for more details.

5) (Let the build process complete, whitelist your ip address) > go to overview and connect.
    5) Select `Connect to your application` option
    5) Select the version `here(3.4)` and copy the connect uri string.
    5) As we are going to use mongoose we dn't need to select the driver (step 3)
    
#### Install Mongoose.
`npm install --save mongoose`  
**Now require the mongoose library and connect `app.js`**
```
const mongoose = require('mongoose');

mongoose.connect('connect uri string', {
    useMongoClient: true
});
```


## Working with Mongoose
Mongoose work with model and schema. So it define. You create a schema first to store the object in
the database and you define a model based on that which is a js object which will have a couple of function to 
work with database (fetch,save,update etc)

1) Create a model(product.js) file in `models` folder and define the products schema there.
2) Require the product.js model in the product route so that we can use the schema there.
3) Check the details working with db code by cloning the repo.


## Data Validation.
#### Define a schema with data validation.
```
const mongoose = require('mongoose');

//Create a schema
const productSchema = mongoose.Schema({
    //js object to determine how my schema should look like
    _id: mongoose.Schema.Types.ObjectId,//id database later passed from products routes
    name: {type: String, required: true},
    price: {type: Number, required: true}
});

/**
 * When you define this schema
 * Use have by default created a rule that your table will contain id,name and price
 * Therefore you cannot send a third property(column) to this table
 * eg: only id,name,price is only valid if you also send for eg a view column it will be ignored.
 * @type {Model}
 */


module.exports = mongoose.model('Product', productSchema);
```
#### Handling a better response on mongoose resposne.
`Check our the controller/routes products.js to checkout the parsed response`


### Uploading Files
Install a package named `multer` is simply a package that like body parser will parse incomming body
but here the form-data(multipart) bodies.  
[more about multer](https://github.com/expressjs/multer)

```bash
$ npm install --save multer
```

Now require the multer package where you want to upload the file here :- in `products.js` route file
we will upload a product image.
```
const multer = require('multer');
const upload = multer({
    //file upload configuration
    dest: 'uploads/' //this configuration will create a upload folder in the project directory.
});
```

Now call the multer middleware where you want to upload the file
``` nodejs
router.post('/', upload.single('productImage'), (req, res, next) => {
    console.log(req.file);
    //this is the new object that will be available to use due to the upload.single middleware/handler being executed.
});
```

**There is lot more to know more clone the project and checkout the code**


### Making the `uploads` folder publicly available 
app.js
```
app.use('/uploads',express.static('uploads'));
```
Now you can access you file with `http://localhost:3000/uploads/filename`

#

**If you want to upload file through binary data**
[parsing binary data node js](https://stackoverflow.com/questions/16598973/uploading-binary-file-on-node-js)
