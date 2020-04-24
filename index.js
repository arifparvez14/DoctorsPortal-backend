const express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express();
app.use(cors()) //Solve cors problem
app.use(bodyParser.json()) // parse application/json

const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true });

//Get
app.get('/', (req, res) => {
    const fruit = {
        product: 'ada',
        price: 220
    }
    res.send(fruit);
});


app.post('/addPatientInfo',(req, res) => {
    const patientDetails = req.body;
    console.log(patientDetails);

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("appointmentDetail").collection("appointments");
        collection.insertOne(patientDetails, (err, result) => {
            if (err) {
                console.log(err)
                res.status(500).send({message:err})
            } else {
                res.send(result.ops[0]);
                
            }
        })
        client.close();
      });
})


const port = process.env.PORT || 4200
app.listen(port, () => console.log("Listening to port", port));
