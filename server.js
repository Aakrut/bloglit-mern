const express = require('express');

require('dotenv').config();

// cors
const cors = require('cors');

//Database Connection
const databaseConnection = require('./db/connect');

//Routes
const authRoute = require('./routes/userRoute');
const PostRoute = require('./routes/postRoute');


const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome 😁!')
})

app.use('/api/v1/auth', authRoute);
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