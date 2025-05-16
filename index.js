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

app.delete('/data/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (isNaN(index) || index < 0 || index >= storedData.length) {
    return res.status(400).json({ message: 'Invalid index' });
  }
  const removed = storedData.splice(index, 1);
  res.json({ message: 'Deleted item', removed, data: storedData });
});


app.get('/data', (req, res) => {
  res.json({ data: storedData });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
