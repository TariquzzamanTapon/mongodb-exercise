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

    /***
     * 1.Find Operation : Find() not access to full data from monogo because of render.if find access to allow full data memory will error. 
     * 1.1 Query using for filter data.
     * 1.2 project() : this using for specific felid like show felid or not show felid. it's receive four values (eg true, false, 0, 1).
     * 1.3 sort(): sort using for sorting data it's receive two values (eg 0, 1).
     * 1.4 skip(): skip using for skip front values(1, 2, 3, 4).skip(2)---> (3,4).
     * 1.5 limit(): limit using for skip end values(1,2,3,4).limit(2)--->(1,2).
     * ***/
    app.get('/doctors', async(req, res)=>{
        const query = {category:"drink"} // query using for filter data
        // const cursor = doctorsCollection.find(query).sort({price: 1}) // query
        // const cursor = doctorsCollection.find(query).project({name:1, _id:0});//project
        // const cursor = doctorsCollection.find().sort({price: 1}).skip(5);//skip
        const cursor = doctorsCollection.find().sort({price: 1}).limit(2);//limit 
        const result = await cursor.toArray();
        res.send(result);
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