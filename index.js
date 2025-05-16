const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  // <--- important!

const storedData = [];

app.post('/data', (req, res) => {
  const value = req.body.value;
  if (value) {
    storedData.push(value);
    res.status(200).json({ message: 'Value stored', data: storedData });
  } else {
    res.status(400).json({ message: 'No value provided' });
  }
});

app.get('/data', (req, res) => {
  res.json({ data: storedData });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
