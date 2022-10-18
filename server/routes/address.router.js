const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// Fetch the addresses associated with specific edition
router.get('/', (req, res) => {

    editionIsbn = req.query.isbn;

    // When doing stretch goals, make this query fetch addresses that match the user's zip code
    sqlText = `SELECT addresses.*, COUNT(*), ARRAY_AGG(libraries.condition) AS conditions,
                                             MODE() WITHIN GROUP (ORDER BY libraries.condition DESC) AS most_common_condition
                    FROM "addresses"
                        JOIN "libraries" ON addresses.id = libraries.address_id
                        JOIN "saved_books" ON libraries.book_id = saved_books.id
                            WHERE saved_books.isbn = $1
                            GROUP BY addresses.id
                            ORDER BY COUNT(libraries.condition) DESC;`

    pool.query(sqlText, [editionIsbn])
        .then((results) => {

            let editions = results.rows;

            // Change condition values to their associated string words
            for (let edition of editions) {
                switch (edition.most_common_condition) {
                    case 'F':
                        edition.most_common_condition = 'fine';
                        break;

                    case 'NF':
                        edition.most_common_condition = 'near fine';
                        break;

                    case 'VG':
                        edition.most_common_condition = 'very good';
                        break;

                    case 'G':
                        edition.most_common_condition = 'good';
                        break;

                    case 'FR':
                        edition.most_common_condition = 'fair';
                        break;

                    case 'P':
                        edition.most_common_condition = 'poor';
                        break;

                    default:
                        break;
                }
            }

            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error in GET /api/addresses query', error)
            res.sendStatus(500);
        })

});

module.exports = router;