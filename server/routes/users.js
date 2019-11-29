var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = require('../connection');


router.get('/', function(req, res) {
    var sql = `SELECT * FROM users`;
    con.query(sql, function(err, results) {
        if(err) throw err;
        res.json(results);
        console.log('Fetched all users -- GET');
    })
});

router.get('/vacationsOrdered', function(req, res) {
    var sql = `SELECT * FROM (SELECT vbu.user_id, v.id, v.description, v.destination, v.price, DATE_FORMAT(v.start_date, '%m/%d/%Y') AS start_date_format, DATE_FORMAT(v.end_date, '%m/%d/%Y') AS end_date_format, IFNULL(NULLIF(v.image, ''), 'http://localhost/vladi_project_images/no_image.jpg') AS checked_image FROM vacations v INNER JOIN vacations_by_users vbu ON vbu.vacation_id = v.id WHERE vbu.user_id = ? UNION SELECT NULL AS user_id, v.id, v.description, v.destination, v.price, DATE_FORMAT(v.start_date, '%m/%d/%Y') AS start_date_format, DATE_FORMAT(v.end_date, '%m/%d/%Y') AS end_date_format, IFNULL(NULLIF(v.image, ''), 'http://localhost/vladi_project_images/no_image.jpg') AS checked_image FROM vacations v) AS temp_table GROUP BY temp_table.id ORDER BY temp_table.user_id DESC`

    con.query(sql, [req.session.userData.id], function(err, results) {
        if(err) throw err;
        res.json(results);
    })
});

router.get('/session', function(req, res) {
    if(req.session.userLogged) {
        res.send(req.session.userData);
    } else {
        res.send('User not found');
    }
})

router.get('/:id', function(req, res) {
    var sql = `SELECT * FROM users WHERE id=${req.params.id}`;
    con.query(sql, function(err, result) {
        if(err) throw err;
        res.json(result);
        console.log(`Fetched single user -- GET :id`);
    })
});


router.post('/register', function(req, res) {
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var username = req.body.username;
    var password = req.body.password
    var sql = 'INSERT INTO users (`first_name`, `last_name`, `username`, `password`) VALUES (?, ?, ?, ?)';
    con.query(sql, [firstName, lastName, username, password], function(err, result) {
        if(err) throw err;
        console.log('New user registered');
        res.json(result);
    });
});

router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    con.query(sql, [username, password], function(err, result) {
        if(err) throw err;
        if(result.length > 0) {
            req.session.userLogged = true;
            req.session.userData = result[0];
            req.session.userData;
            res.json(req.session.userData);
            
           
        } else {
            res.json({'user': 'not found'});
        }
    })
    
});

router.post('/like/:vacId', function(req, res, next) {
    var likeFoundSQL = "SELECT * FROM `vacations_by_users` WHERE `user_id` = ? AND `vacation_id` = ?";
    var likeSQL = "INSERT IGNORE INTO vacations_by_users (`user_id`, `vacation_id`) VALUES (?, ?)";
    var unlikeSQL = "DELETE FROM `vacations_by_users` WHERE  `user_id` = ? AND `vacation_id` = ?";
    var addFollower = "UPDATE vacations SET `follow_count` = follow_count + 1 WHERE id = ?";
    var removeFollower = "UPDATE vacations SET `follow_count` = follow_count - 1 WHERE id = ?";

    con.query(likeFoundSQL, [req.session.userData.id, req.params.vacId], function(err, result) {
        if (err) throw err;
        if (result.length === 0) {
            con.query(likeSQL, [req.session.userData.id, req.params.vacId], function(err, result) {
                if(err) throw err;
                con.query(addFollower, [req.params.vacId], function(err, result) {
                    if(err) throw err;
                    res.json({'status': 'liked'});
                })
            })
        } if(result.length > 0) {
            con.query(unlikeSQL, [req.session.userData.id, req.params.vacId], function(err, result) {
                if(err) throw err;
                con.query(removeFollower, [req.params.vacId], function(err, result) {
                    if(err) throw err;
                    res.json({'status': 'unliked'});
                });
            })
        }
    })


    // con.query(sql, [req.session.userData.id, req.params.vacId], function(err, result) {
    //     if(err) throw err;
    //     res.json({"status": "liked"});
    // })
})

router.post('/logout', function(req, res, next) {
    req.logout();
    res.json({'user': 'successfully logged out'});
});













module.exports = router;