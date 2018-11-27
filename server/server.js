const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const { db } = require('./db/db')

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./api'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

db.sync()
  .then(() => {
    console.log('The database is synced!')
    app.listen(PORT, () => console.log(`

      Loud and clear on port ${PORT}
      http://localhost:${PORT}/

    `))
  })
