import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import loanRouter from "./ui/routes/loanRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const API_VERSION = "v1";

app.use(bodyParser.json());
app.use(`/${API_VERSION}/loans`, loanRouter);
app
  .listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
  });
