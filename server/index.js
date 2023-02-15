import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index.js';

const app = express();
dotenv.config();
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use('/user',routes);

const PORT = process.env.PORT;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTION_URL)
    .then(() => app.listen(PORT,() => console.log(`Successfully listening on port ${PORT}`)))
    .catch((error) => console.log(error))
