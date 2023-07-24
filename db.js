const mongoose = require("mongoose");
const { MONGO_DEV_URL } = process.env;
exports.connect = () => {
  mongoose
    .connect(MONGO_DEV_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((x) => {
      console.log(`Connected to database ${x.connections[0].name}`);
    })
    .catch((error) => {
      console.log(`Error connecting to mongo ${error.message}`);
    });
};
