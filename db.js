const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/book');

const db = mongoose.connection;

db.on('error', (err) => console.log('MongoDB error occurred:', err))
db.once('open', () => {
  console.log('Connected to MongoDB')
})