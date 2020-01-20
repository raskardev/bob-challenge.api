const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const { start } = require("./db");

const app = express();

const morganFormat = process.env.NODE_ENV === "development" ? "dev" : "tiny";

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan(morganFormat));

const main = async () => {
  await start();

  app.listen(
    process.env.PORT,
    process.env.NODE_ENV === "development" &&
      console.log(`Server listening at http://localhost:${process.env.PORT}`),
  );
};

main();
