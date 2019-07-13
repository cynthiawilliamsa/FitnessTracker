const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect DB
connectDB();

//init middleware (body parser now included with express)
app.use(express.json({extended: false}))

//define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'))

const port = process.env.port || 5000

// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`listening on port ${port}!`))