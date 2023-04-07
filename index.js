import app from "./app.js";
import db from "./configs/MongoDb.js";
import "dotenv/config.js"

db();


app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}...`);
});
