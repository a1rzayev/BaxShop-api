const express = require('express');
const cors = require('cors');
require('dotenv').config();
const errorHandler = require("./middleware/error_middleware")
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(errorHandler);
app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
