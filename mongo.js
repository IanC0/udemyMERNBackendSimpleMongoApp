
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://DB-user3:password1234@cluster0.himpb.mongodb.net/products_test?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


const createProduct = async (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    };
    //client is defined on line 6
    // const client = new MongoClient(uri);    

    try {
        await client.connect();
        const db = client.db();
        const result = await db.collection('products').insertOne(newProduct);
    } catch (error) {
        return res.json({message: 'Could not store data.'})
    };

    client.close();

    res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  let products;

  try {
    await client.connect();
    const db = client.db();
    products = await db.collection('products').find().toArray();
  } catch (error) {
    return res.json({message: 'Could not retrieve products.'})
  }

  client.close();
  res.json(products)
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;