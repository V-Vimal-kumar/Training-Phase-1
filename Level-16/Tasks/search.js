import express from 'express';

const app = express();
const PORT = 3000;

app.get('/search', (req, res) => {
  const query = req.query.q;
  let limit = req.query.limit;
  
  if (!limit || isNaN(limit)) {
    limit = 5;
  } else {
    limit = parseInt(limit);
  }
  
  if (!query) {
    return res.status(400).send('Please provide a search query (q parameter)');
  }
  
  res.send(`Search for: ${query}, Limit: ${limit}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


