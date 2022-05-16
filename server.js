const express = require('express');

require('dotenv').config();

//Database Connection
const databaseConnection = require('./db/connect');

//Routes
const PostRoute = require('./routes/postRoute');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome 😁!')
})

app.use('/api/v1/blog', PostRoute);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await databaseConnection(process.env.MONGO_URI);
        app.listen(port, () => {
          console.log(`Server is Running on http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();