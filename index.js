const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

// Database Configuration
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4b6iz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Run Function
async function run() {
  try {
    await client.connect();
    const database = client.db("ssdm");

    //Collection List
    const fhPayrollConcernsCollection = database.collection("fhPayrollInfo");
    const installationTools = database.collection("InstallationTools");

    /* Four H Payroll Information */

    // Get All Data
    app.get("/fhPayrollInfo", async (req, res) => {
      const cursor = fhPayrollConcernsCollection.find({});
      const payrollInfo = await cursor.toArray();
      res.send(payrollInfo);
    });

    /* Software Installation Tools */
    app.get("/tools", async (req, res) => {
      const cursor = installationTools.find({});
      const toolsInfo = await cursor.toArray();
      res.send(toolsInfo);
    });
  } finally {
    //await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("I am from Node Server");
});

app.listen(port, () => {
  console.log("Listening Port", port);
});
