const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/', rejectUnauthenticated, (req, res) => {

    // ••• This route is forbidden if not logged in •••
    // Get a user's library
    const sqlText = `SELECT 
                    libraries.id AS library_id,
                    saved_books.*,
                    libraries.*,
                    addresses.*
                FROM "libraries"
                    JOIN "saved_books" ON libraries.book_id = saved_books.id
                    LEFT JOIN "addresses" ON libraries.address_id = addresses.id
                        WHERE libraries.user_id = $1
                        ORDER BY libraries.id;`

    pool.query(sqlText, [req.user.id])
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('Error in GET /api/library query', error)
            res.sendStatus(500);
        })

});

router.put('/:id', rejectUnauthenticated, (req, res) => {

    // ••• This route is forbidden if not logged in •••
    // If condition has been sent 
    if (req.body.condition) {
        const newCondition = req.body.condition;
        // Update library item condition if sent condition matches accepted condition value
        if (newCondition === 'F' || newCondition === 'NF' || newCondition === 'VG' || newCondition === 'G' || newCondition === 'FR' || newCondition === 'P') {
            const sqlText = `UPDATE "libraries"
                                SET "condition" = $1
                                WHERE "id" = $2
                                AND "user_id" = $3;`
            pool.query(sqlText, [newCondition, req.params.id, req.user.id])       
                .then((results) => {
                    res.sendStatus(200);
                })
                .catch((error) => {
                    console.log('Error in PUT /api/library condition query', error)
                    res.sendStatus(500);
                })             
        } else {
            // If non-matching condition, send back 304 Not Modified
            res.sendStatus(304);
        }
    } else if (req.body.newAddressObject) { // If location has been sent

        const location = req.body.newAddressObject;

        // First, attempt to insert the address into the address table assuming it's new
        const sqlText = `INSERT INTO "addresses"
                            ("name", "street_address", "city", "state", "zip", "googleMaps_placeId")
                            VALUES
                            ($1, $2, $3, $4, $5, $6)
                            RETURNING "id";`

        pool.query(sqlText, [location.name, location.street_address, location.city, location.state, location.zip, location.googleMaps_placeId])       
            .then((results) => {
                // Use the results to get the new address id, then update the library entry
                console.log('RESULTS IN NEW ADDY', results.rows[0].id);
                const addressId = results.rows[0].id;
                const sqlText = `UPDATE "libraries"
                                    SET "address_id" = $1
                                    WHERE "id" = $2;`

                pool.query(sqlText, [addressId, req.params.id])
                .then(results => {
                    res.sendStatus(200);
                })
                .catch(error => {
                    console.log('Error in PUT /api/library update libraries query using new address id', error);
                    res.sendStatus(500);
                })
            })
            .catch((error) => {
                // In catch -> get the existing address id to use
                console.log('Error creating new address, fetching existing address id', error)
                const sqlText = `SELECT "id" FROM "addresses"
                                    WHERE "googleMaps_placeId" = $1;`
                
                pool.query(sqlText, [location.googleMaps_placeId])
                    .then((results) => {
                        // Use the results to get the existing address id, then update the library entry
                        console.log('RESULTS IN NEED USE OLD ADDY', results.rows[0].id);
                        const addressId = results.rows[0].id;
                        const sqlText = `UPDATE "libraries"
                                            SET "address_id" = $1
                                            WHERE "id" = $2;`
                        
                        pool.query(sqlText, [addressId, req.params.id])
                            .then(results => {
                                res.sendStatus(200);
                            })
                            .catch(error => {
                                console.log('Error in PUT /api/library update libraries query using existing address id', error);
                                res.sendStatus(500);
                            })
                    })
                    .catch((error) => {
                        console.log('Error in PUT /api/library query, could not fetch existing address id', error);
                        res.sendStatus(500);
                    })
            });     
    }

});

router.post('/', rejectUnauthenticated, async (req, res) => {

    // ••• This route is forbidden if not logged in •••

    const bookToAdd = req.body;

    const userId = req.user.id;

    // First, try to add the book to the the saved_books table
    sqlTryText = `INSERT INTO "saved_books"
                    ("title", "author", "isbn", "edition", "cover", "publisher", "year")
                    VALUES
                    ($1, $2, $3, $4, $5, $6, $7)
                    RETURNING "id";`

    // If insert error (book already saved), just get the existing id
    sqlCatchText = `SELECT "id" FROM "saved_books"
                        WHERE "isbn" = $1;`  
                        
    // Query to create the user's library entry
    sqlCreateText = `INSERT INTO "libraries"
                        ("user_id", "book_id")
                        VALUES
                        ($1, $2);`

    const connection = await pool.connect();

    try {
        await connection.query('BEGIN;');

        const tryResults = await connection.query(sqlTryText, [bookToAdd.title, 
                                                           bookToAdd.author, 
                                                           bookToAdd.isbn, 
                                                           bookToAdd.edition, 
                                                           bookToAdd.cover, 
                                                           bookToAdd.publisher,
                                                           bookToAdd.year]);

        await connection.query(sqlCreateText, [userId, tryResults.rows[0].id]);

        // Confirm successful actions
        await connection.query('COMMIT;');

        res.sendStatus(201);

    } catch (error) {
        // No need for rollback? Unless you don't want to save a book that fails to add to user library
        await connection.query('ROLLBACK;');

        console.log('Error adding book to library, likely already exists in saved_books', error);

        try {

            await connection.query('BEGIN;');

            const catchResults = await connection.query(sqlCatchText, [bookToAdd.isbn]);

            await connection.query(sqlCreateText, [userId, catchResults.rows[0].id]);

            await connection.query('COMMIT;');

            res.sendStatus(201);

        } catch (error) {
            console.log('Error in /api/library query adding existing book to library', error)
            res.sendStatus(500);
        }

    }
    
});

router.post('/fromwishlist', rejectUnauthenticated, async (req, res) => {

    // ••• This route is forbidden if not logged in •••

    console.log('req.body:', req.body.id);

    const wishlist_id = req.body.id;

    const queryValues = [wishlist_id, req.user.id];

    const sqlCreateText = `INSERT INTO "libraries"
                                ("user_id", "book_id")
                                VALUES
                                (($1),
                                (SELECT "book_id"
                                    FROM "wishlists"
                                        WHERE "id" = $2
                                        AND user_id = $1));`

    const sqlDeleteText = `DELETE FROM "wishlists"
                                WHERE "id" = $1
                                AND user_id = $2;`

    const connection = await pool.connect();

    // BEGIN TRANSACTION;
    // INSERT INTO Table2 (<columns>)
    // SELECT <columns>
    // FROM Table1
    // WHERE <condition>;

    // DELETE FROM Table1
    // WHERE <condition>;

    // COMMIT;

    try {
        await connection.query('BEGIN;');

        await connection.query(sqlCreateText, [req.user.id, req.body.id]);
        await connection.query(sqlDeleteText, queryValues);

        // Confirm successful actions
        await connection.query('COMMIT;');

        res.sendStatus(200);

    } catch (error) {
        await connection.query('ROLLBACK;');
        console.log('Error in POST /api/library/fromwishlist', error)
        res.sendStatus(500);
    }

})

router.delete('/:id', rejectUnauthenticated, (req, res) => {
    
    // ••• This route is forbidden if not logged in •••
    deleteId = req.params.id;
    sqlText = `DELETE FROM "libraries"
                WHERE "id" = $1;`

    pool.query(sqlText, [deleteId])
        .then(results => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log('Error in DELETE /api/library', error)
            res.sendStatus(500);
        })
});


module.exports = router;