const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("../swagger.json");
const router = require("./app/routes/route");
const bodyParser = require("body-parser");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const port = 3000;

app.use(helmet());
app.use(morgan("common")); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World! 👋");
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
