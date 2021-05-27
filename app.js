const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://mycrudappnodewebdev:mycrudappnodewebdev@cluster0.miopc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  // const collection = client.db("test").collection("devices");
  // perform actions on the collection object

  if (err) return console.error(err);
  console.log("Connected to Database");

  const db = client.db("mycrudappnodewebdev");

  const quotesCollection = db.collection("quotes");

  app.set("view engine", "ejs");
  app.use(express.static("public"));
  app.use(bodyParser.json());

  // Make sure you place body-parser before your CRUD handlers!
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    // res.sendFile(__dirname + "/index.html");
    // Note: __dirname is the current directory you're in. Try logging it and see what you get!

    // const cursor = db.collection("quotes").find();

    db.collection("quotes")
      .find()
      .toArray()
      .then((results) => {
        res.render("index.ejs", { quotes: results });
      })
      .catch((error) => console.error(error));

    // res.render("index.ejs", {});
  });

  app.post("/quotes", (req, res) => {
    quotesCollection
      .insertOne(req.body)
      .then((result) => {
        res.redirect("/");
        console.log(result);
      })
      .catch((error) => console.error(error));
  });

  app.put("/quotes", (req, res) => {
    quotesCollection
      .findOneAndUpdate(
        { name: "seth" },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote,
          },
        },
        {
          upsert: true,
        }
      )
      .then((result) => {
        res.json("Success");
      })
      .catch((error) => console.error(error));
  });

  app.delete("/quotes", (req, res) => {
    // Handle delete event here

    quotesCollection
      .deleteOne({ name: req.body.name })
      .then((result) => {
        if (result.deletedCount === 0) {
          return res.json("No quote to delete");
        }
        res.json(`Deleted seth's quote`);
      })
      .catch((error) => console.error(error));
  });

  app.listen(process.env.PORT || 3000, function () {
    console.log(
      "Express server listening on port %d in %s mode",
      this.address().port,
      app.settings.env
    );
  });

  // client.close();
});
