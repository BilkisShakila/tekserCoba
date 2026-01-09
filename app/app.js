const express = require("express");
const path = require("path");
const routes = require("./routes/index");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`MindCare app running on port ${PORT}`);
});
