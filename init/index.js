const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const { object } = require("joi");

const MONGO_URL ="mongodb://127.0.0.1:27017/wander";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Error connecting to DB:", err);
  });

async function main() {
    await mongoose.connect(MONGO_URL);
  }

  const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner: '67c5a58e167c1015b9f71870'}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialize");

  }

  initDB();