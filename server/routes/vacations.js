var express = require('express');
var router = express.Router();
var con = require('../connection'); 

router.get('/', function(req, res) {
    var sql = `SELECT *, DATE_FORMAT(start_date, '%m/%d/%Y') AS start_date_format, DATE_FORMAT(end_date, '%m/%d/%Y') AS end_date_format, IFNULL(NULLIF(image, ''), 'http://localhost/vladi_project_images/no_image.jpg') AS checked_image FROM vacations ORDER BY follow_count DESC`;
    con.query(sql, function(err, results) {
        if(err) throw err;
        res.json(results);
        console.log('All vacations fetched --GET');
    })
});

router.get('/hotspots', function(req, res) {
    var sql = "SELECT * FROM `vacations` ORDER BY `follow_count` DESC LIMIT 3";
    con.query(sql, function(err, results) {
        if(err) throw err;
        res.json(results);
        console.log('Fetched hotspots');
    });
})

router.get('/:id', function(req, res) {
    var insert = req.params.id;
    var sql = `SELECT *, DATE_FORMAT(start_date, '%m/%d/%Y') AS start_date_format, DATE_FORMAT(end_date, '%m/%d/%Y') AS end_date_format, IFNULL(NULLIF(image, ''), 'http://localhost/vladi_project_images/no_image.jpg') AS checked_image FROM vacations WHERE id = ?`;
    con.query(sql, insert, function(err, result) {
        if(err) throw err;
        res.json(result);
        console.log(result);
    });
});


router.post('/', function(req, res) {
    var vacation = [
        req.body.description,
        req.body.destination,
        req.body.image,
        req.body.start_date,
        req.body.end_date,
        req.body.price
    ];
    var sql = "INSERT INTO vacations (`description`, `destination`, `image`, `start_date`, `end_date`, `price`) VALUES (?, ?, ?, ?, ?, ?)";
    con.query(sql, vacation, function(err, result) {
        if(err) throw err;
        res.json(result);
        console.log(result);
    });

});

router.put('/:id', function(req, res) {
    var vacation = [
        req.body.description,
        req.body.destination,
        req.body.image,
        req.body.start_date,
        req.body.end_date,
        req.body.price,
        req.params.id
    ];
    var sql = "UPDATE vacations SET description = ?, destination = ?, image = ?, start_date = ?, end_date = ?, price = ? WHERE id = ?";
    con.query(sql, vacation,  function(err, result) {
        if(err) throw err;
        res.json(result);
        console.log(result);
    });
});

router.delete('/:id', function(req, res) {
    var sql = "DELETE FROM vacations WHERE id = ?";
    var insert = req.params.id;
    con.query(sql, insert, function(err, result) {
        if(err) throw err;
        res.json(result);
        console.log(result);
    });
});


module.exports = router;