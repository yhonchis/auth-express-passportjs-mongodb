require("dotenv").config();

const { USER, PASSWORD, CLUSTER, DB } = process.env;

const db = {
  user: USER,
  password: PASSWORD,
  cluster: CLUSTER,
  dbname: DB,
};

module.exports = db;
