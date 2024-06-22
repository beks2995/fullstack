const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const pathToFile = './server/product.json'
const cors = require('cors')
const {MongoClient} = require('mongodb')

app.use(cors())

// Connection URL
const url = 'mongodb+srv://beks2992:beks2992@cluster0.caq6tpo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url);

// Database Name
const dbName = 'market';

async function dbConnection() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('products');
  // the following code examples can be pasted here...

  return collection;
}



// const corsOpt = {
//     origin: process.env.CORS_ALLOW_ORIGIN || '*', // this work well to configure origin url in the server
//     methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // to works well with web app, OPTIONS is required
//     allowedHeaders: ['Content-Type', 'Authorization'] // allow json and token in the headers
// };
// app.use(cors(corsOpt)); // cors for all the routes of the application
// app.options('*', cors(corsOpt)); // automatic cors gen for HTTP verbs in all routes, This can be redundant but I kept to be sure that will always work.

// var corsOptions = {
//     origin: 'http://localhost:8080',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/product', async (req, res) => {
  // if (fs.existsSync(pathToFile)) {
  //   const data = fs.readFileSync(pathToFile)
  //   const products = JSON.parse(data)
  //   res.json(products)
  // } else {
  //   res.json({
  //       success: false,
  //       reason: 'no data'
  //   })
  // }
  const data = await dbConnection()
  .then((data) => data.find().toArray())
  .catch(console.error)
  .finally(() => client.close());

  res.json(data)

})
app.post('/product', async (req, res) => {
  const newProduct = req.body
  await dbConnection()
  .then((data) => data.insertOne(newProduct))
  .catch(console.error)
  .finally(() => client.close());
  // let products = []
  // if (fs.existsSync(pathToFile)) {
    
  //   const data = fs.readFileSync(pathToFile)
  //   if(data.length === 0){
  //      products = [] 
  //   } else {
  //     products = JSON.parse(data)
  //   }
  // }

  // products.push(newProduct)
  // fs.writeFileSync(pathToFile, JSON.stringify(products, null, 2))


  res.json({ newProduct })
})

app.listen(8080)