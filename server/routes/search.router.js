const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
    const query = req.query.query;
    const searchType = req.query.type;

    axios.get(`http://openlibrary.org/search.json?${searchType}=${query}&limit=50`)
    .then((books => {
      res.send(books.data.docs);
    }))
    .catch((error => {
      console.log('/api/search GET Error', error);
    }));
})

module.exports = router;