import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import http from 'http'
import router from './Routes/apiRoutes.js';
mongoose.Promise = global.Promise

const app = express();

app.set('trust proxy', true);
dotenv.config()

let port = 3000;
let dbConfig ='mongodb+srv://bhagwatilalmenariyahawkscode:hH5YPr2cSEHeYvpH@tododata.f9o29fh.mongodb.net/';

mongoose.set("strictQuery", false);
mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));


app.use(cors()); 
app.use((err, req, res, next) => {

    res.status(err.status || 500);
    res.json({
        code: 500,
        message: "Server Issue, Please Try Again Later"
    });
});


app.use(router)

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`HTTP server listening on port ${port}`);
});
