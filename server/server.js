import express from "express"
import { config } from "dotenv";
import router from "./routes.js";
config();

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json())

// Routes
app.use("/api", router)


app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})