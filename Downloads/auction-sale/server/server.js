const express = require("express");
const dbJson = require("./items-db.json");
const app = express();
app.use("/images", express.static("public"));
//allows cross origin access
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.listen(3000, () => {
  setInterval(virtualBid, 10000);
  console.log("server started and listening on port 3000...");
});

app.get("/list", (req, res) => {
  console.log("GET :/list received @" + new Date(Date.now()).toISOString());
  res.send(dbJson);
});

app.post("/bid", (req, res) => {
  const { id, newBid, newBidUser } = req.query;
  console.log("Post :/list received @" + new Date(Date.now()).toISOString());
  console.log(id, newBid, newBidUser);

  if (newBid === undefined || newBid == "undefined" || newBid == "null") {
    console.log("new bid is missing");
    res.status(400).send("new bid is missing");
    return;
  }

  if (
    newBidUser === undefined ||
    newBidUser == "undefined" ||
    newBidUser == "null"
  ) {
    console.log("new bid user is missing");
    res.status(400).send("new bid user is missing");
    return;
  }

  const match = dbJson.find((item) => item.id == id);

  if (match == undefined) {
    console.log("invalid or missing item ID");
    res.status(400).send("invalid or missing item ID");
    return;
  }

  if (match.lastBid >= newBid) {
    console.log("Bid is not high enough");
    res.status(400).send("Bid is not high enough");
    return;
  }

  match.lastBid = newBid;
  match.lastBidUser = newBidUser;

  res.send("ok");
});
function virtualBid() {
  dbJson.forEach((item) => {
    const increase = Math.random() * 2;
    item.lastBid *= Number(1.0 + increase / 100);
    item.lastBidUser = "AIBider";
  });
}
