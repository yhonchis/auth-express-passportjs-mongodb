const mongoose = require("mongoose");
const { user, password, cluster, dbname } = require("./keys");

const getConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${user}:${password}@${cluster}.y3tsr.mongodb.net/${dbname}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      }
    );
    console.log("Database is coneccted");
  } catch (error) {
    console.error("Error internal: ", error);
  }
};

getConnection();
