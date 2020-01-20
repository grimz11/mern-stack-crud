const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const path = require("path");
const config = require("config");

const app = express();

//bodyparser middleware
app.use(express.json());

//mongoo db-uri
// const db = require("./config/keys").mongoURI;
const db = config.get("mongoURI");

//connect to mongo db
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongoo connected!"))
  .catch(err => console.log(err));

//use routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/user-auth", require("./routes/api/userAuthRegister"));
app.use("/api/auth", require("./routes/api/auth"));

// serve static asset if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
