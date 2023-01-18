import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./src/routes/Posts.js";
// import authRoutes from "./src/routes/Auth.js";
// connection to db
import { connect } from "./src/confiq/db.js";

const app = express();
app.use(cookieParser());
app.use(express.json());

const corsOptions ={
  origin:'http://localhost:3001', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}


app.use(cors(corsOptions));
dotenv.config();

const port = 5000;

app.use(express.json());

// app.use('/api/auth', authRoutes)
app.use("/api/posts", postRoutes);

app.use('/', (req, res)=> res.send("talha"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connect();
});
