const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req, res) => {
    const workRoute = req.query.workroute;

    axios.get(`https://openlibrary.org/works/${workRoute}/editions.json`)
    .then((editions => {
      res.send(editions.data.entries);
    }))
    .catch((error => {
      console.log('/api/editions GET Error', error);
    }));
})

module.exports = router;