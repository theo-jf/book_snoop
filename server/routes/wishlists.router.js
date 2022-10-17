const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {

    // ••• This route is forbidden if not logged in •••
    // Get a user's wishlist
    const sqlText = `SELECT 
                    wishlists.id AS wishlist_id,
                    saved_books.*,
                    wishlists.*
                FROM "wishlists"
                    JOIN "saved_books" ON wishlists.book_id = saved_books.id
                        WHERE wishlists.user_id = $1
                        ORDER BY wishlists.id;`

    pool.query(sqlText, [req.user.id])
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error in GET /api/wishlist query', error)
            res.sendStatus(500);
        })

});

router.post('/', rejectUnauthenticated, async (req, res) => {

    // ••• This route is forbidden if not logged in •••

    const bookToAdd = req.body;

    const userId = req.user.id;

    // First, try to add the book to the the saved_books table
    sqlTryText = `INSERT INTO "saved_books"
                    ("title", "author", "isbn", "cover", "publisher", "year")
                    VALUES
                    ($1, $2, $3, $4, $5, $6)
                    RETURNING "id";`

    // If insert error (book already saved), just get the existing id
    sqlCatchText = `SELECT "id" FROM "saved_books"
                        WHERE "isbn" = $1;`  
                        
    // Query to create the user's library entry
    sqlCreateText = `INSERT INTO "wishlists"
                        ("user_id", "book_id")
                        VALUES
                        ($1, $2);`

    const connection = await pool.connect();

    try {
        await connection.query('BEGIN;');

        const tryResults = await connection.query(sqlTryText, [bookToAdd.title, 
                                                           bookToAdd.author, 
                                                           bookToAdd.isbn,
                                                           bookToAdd.cover, 
                                                           bookToAdd.publisher,
                                                           bookToAdd.year]);

        await connection.query(sqlCreateText, [userId, tryResults.rows[0].id]);

        // Confirm successful actions
        await connection.query('COMMIT;');

        res.sendStatus(201);

    } catch (error) {
        // No need for rollback? Unless you don't want to save a book that fails to add to user wishlist
        await connection.query('ROLLBACK;');

        console.log('Error adding book to wishlist, likely already exists in saved_books', error);

        try {

            await connection.query('BEGIN;');

            const catchResults = await connection.query(sqlCatchText, [bookToAdd.isbn]);

            await connection.query(sqlCreateText, [userId, catchResults.rows[0].id]);

            await connection.query('COMMIT;');

            res.sendStatus(201);

        } catch (error) {
            console.log('Error in /api/wishlist query adding existing book to wishlist', error)
            res.sendStatus(500);
        }

    }
    
});

router.delete('/:id', rejectUnauthenticated, (req, res) => {

    // ••• This route is forbidden if not logged in •••
    // Delete wishlist item
    const sqlText = `DELETE FROM "wishlists"
                        WHERE "id" = $1
                        AND user_id = $2;`

    pool.query(sqlText, [req.params.id, req.user.id])
        .then((results) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error in DELETE /api/wishlist query', error);
            res.sendStatus(500);
        });
})


module.exports = router;