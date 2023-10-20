const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const port = 5000;
require('dotenv').config()


app.use(express.json());

app.get('/', (req, res)=>{
    res.send('your server is running dude')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fsoo8nr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection


    const doctorsCollection = client.db('DoctorDB').collection('Doctors');

    app.get('/doctors', async(req, res)=>{
        // const query = {category:"fruits"}
        const result = await doctorsCollection.find().toArray();
        res.send(result)
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, ()=>{
    console.log(`server is running ${port}`)
})