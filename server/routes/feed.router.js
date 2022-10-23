const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
    // In the future, retrieve zip code query => req.query.zip
    const sqlText = `SELECT count, time_stamps, title, cover, publisher, "from"
                        FROM (
                            SELECT COUNT(DISTINCT wishlists.user_id), 
                                   ARRAY_AGG(date_created ORDER BY date_created DESC) as time_stamps, 
                                   saved_books.title, 
                                   saved_books.cover, 
                                   saved_books.publisher, 
                                   'wishlist' as "from"
                                FROM "wishlists"
                                    JOIN "saved_books" ON wishlists.book_id = saved_books.id
                                    GROUP BY saved_books.title, saved_books.id
                                    UNION
                            SELECT COUNT(DISTINCT libraries.user_id),
                                   ARRAY_AGG(date_created ORDER BY date_created DESC) as time_stamps, 
                                   saved_books.title, 
                                   saved_books.cover, 
                                   saved_books.publisher, 
                                   'library' as "from"
                                FROM "libraries"
                                    JOIN "saved_books" ON libraries.book_id = saved_books.id
                                    GROUP BY saved_books.title, saved_books.id
                        ) results
                            ORDER BY time_stamps DESC;`

});


module.exports = router;