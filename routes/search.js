var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const fs = require('fs');

//Import puppeteer function
const searchGoogle = require('../controllers/searchGoogle');

//Catches requests made to localhost:3000/search
router.get('/search', (request, response) => {

    //Holds value of the query param 'searchquery'.
    const searchQuery = request.query.searchquery;

    //Do something when the searchQuery is not null.
    if (searchQuery != null) {

        searchGoogle(searchQuery)
            .then(results => {
                //Returns a 200 Status OK with Results JSON back to the client.
                response.status(200);
                response.json(results);
                //console.log(results);
                const data = JSON.stringify(results, null, 4);
                fs.writeFile('results.json', data, (err) => {
                    if (err) {
                        throw err;
                    }
                    console.log("JSON data is saved.");
                });
                
              

            });
    } else {
        response.end();
    }
});
module.exports=router;