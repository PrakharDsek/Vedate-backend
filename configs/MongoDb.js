import mongoose from "mongoose";
import "dotenv/config";

const db = () => {
  mongoose
    .connect(process.env.MONGOURI, {
      dbName: "Vedates",
    })
    .then(() => console.log("db is enabled"))
    .catch((error) => console.log(error.message));
};

export default db;
