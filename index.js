const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { connectDB } = require('./utils/DBconnection');

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
connectDB(MONGO_URI);

// importing All Route 
const routes = require('./routes/routes');
const errorMiddleware = require('./middleware/error');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: "node work properly!"
    });
});

app.use('/api/v1', routes);
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`server listen on port ${port}`);
}) 