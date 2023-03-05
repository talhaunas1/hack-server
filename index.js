import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./src/routes/Posts.js";
import Post from "./src/schemas/Posts.js";
import AuthRoutes from './src/routes/Auth.js'
// import authRoutes from "./src/routes/Auth.js";
// connection to db
import { connection } from "./src/database/connection.js";

const app = express();
app.use(cookieParser());
app.use(express.json());
dotenv.config();

// const corsOptions = {
//   origin: "http://localhost:3001", 
//   credentials: true,            //access-control-allow-credentials:true
//   optionSuccessStatus: 200
// }

// app.use(cors(corsOptions));

// app.use(cors({
//     credentials: true,
//     origin: "http://localhost:3001/",
//     // origin: "http://localhost:3000",
// }));

app.use(
  cors({
      credentials: true,
      origin: "http://localhost:3000",
  })
);
// app.use(cors());
const port = process.env.PORT || 8080;


app.use('/api/auth', AuthRoutes)
app.use("/api/posts", postRoutes);

app.use('/', async (req, res)  => {
  try {
    const posts = await Post.aggregate([{ $sample: { size: 3 } }]);
    res.json(posts);
  } catch (error) {
    res.send(error);
  }
});


async function connect (){
  try {
    connection(process.env.MONGO_URL);
    app.listen(port, console.log(`server running in port ${port}`))
  } catch (error) {
    console.log(error);
  }
}
connect();
