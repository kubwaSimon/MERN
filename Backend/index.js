import express from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import {Book} from './models/bookmodels.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Hnadling CORS policy
app.use(cors()); //option one

/*another option for cors
app.use (
  cors ({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST','PUT','DELETE'],
    allowedHeaders: ['content.Type'],
  })
);*/

app.get('/',(request, response) =>{
console.log(request)
return response.status(234).send('Welcome to MERN')
});

app.use('/books', booksRoute);
mongoose
 .connect(mongoDBURL)
 .then(() => {
  console.log('App connected to DB');
  app.listen(PORT, () => {
   console.log('App is listening to port:${port}');
  });
})
.catch((error) => {
console.log(error);
});