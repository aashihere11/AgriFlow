const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const dns = require("dns");

dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

