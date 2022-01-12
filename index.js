const { Pool, Client } = require('pg');

express = require('express');
const app = express();
const PORT = 3000;


const pool = new Pool({
  user: 'kyelindholm',
  host: '127.0.0.1',
  database: 'reviews',
  password: null,
});

const client = new Client({
  user: 'kyelindholm',
  host: '127.0.0.1',
  database: 'reviews',
  password: null,
});

client.connect();

app.get('/reviews/', (req, res) => {
  console.log('/reviews/');
  res.status(200).send('/reviews/');
});

app.get('/reviews/meta', (req, res) => {
  console.log('/reviews/meta');
  res.status(200).send('/reviews/meta');
});

app.post('/reviews', (req, res) => {
  console.log('post /reviews');
  res.status(200).send('post reviews');
});

app.put('/reviews/:review_id/helpful', (req, res) => {
  const review_id = req.params.review_id;
  let helpfulness = 0;

  client.query(`SELECT helpfulness FROM reviews WHERE id = ${review_id}`, (err, response) => {
    helpfulness = response.rows[0].helpfulness;
    let newHelpfulness = helpfulness + 1;
    client.query(`UPDATE reviews SET helpfulness = ${newHelpfulness} WHERE id = ${review_id}`, (error) => {
      if (error) throw error;
      res.status(204).send();
    });
  })
});

app.put('/reviews/:review_id/report', (req, res) => {
  const review_id = req.params.review_id;
  client.query(`UPDATE reviews SET reported = true WHERE id = ${review_id}`, (err, response) => {
    if (err) throw err;
    console.log(`review #${review_id} reported`);
    res.status(204).send();
  });
});





app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});