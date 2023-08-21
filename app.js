const express = require('express');
const app = express();
const port = 4001;

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello, API!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

