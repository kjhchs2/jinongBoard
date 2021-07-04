const express = require('express');
const router = express.Router();
const path = require('path');
const mysql = require('../bin/mysql');

// index.html 연결
router.get('/board/create', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
});
router.get('/board/:id', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
});
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

// api
router.get('/api/post', function(req, res, next){
    try{
        const sql = 'SELECT * FROM posttable';
        mysql.query(sql, function(err, posts){
            res.send(posts);
            // res.sendFile(path.join(__dirname, '../public', 'index.html'), posts);

        })
    } catch (e){
        console.log(e);
    }
    
});

router.get('/api/post/:id', function(req, res, next){
    try{
        const id = req.params.id;
        const sql = `SELECT * FROM posttable WHERE id = ${id}`;
        mysql.query(sql, function(err, posts){
            res.send(posts);
        })
    } catch (e){
        console.log(e);
    }
});


// create post 요청
router.post('/api/post', function(req, res, next) {
    try{
        const post = req.body;
        const sql = 'INSERT INTO posttable(title, contents, user, password, createdDate, modifiedDate) values ';
        const sqlValue = `("${post.title}", "${post.contents}", "${post.user}", "${post.password}", NOW(), NOW());`;
        mysql.query(sql + sqlValue, function(err, rows, fields) {
            if(!err) {
                res.json(true);
            } else {
                console.log(err);
                res.json(false);
            }
        });
    } catch (e) {
        console.log(e);
        res.json(false);
    }
});

router.put('/api/post/:id', function(req, res, next) {
    try{
        const post = req.body;
        const sql = `UPDATE posttable SET title="${post.title}", user="${post.user}", contents="${post.contents}", password="${post.password}", modifiedDate=NOW() WHERE id = ${post.id}`
        mysql.query(sql, function(err, rows, fields) {
            if(!err) {
                res.json(true);
            } else {
                console.log(err);
                res.json(false);
            }
        });
    } catch (e) {
        console.log(e);
        res.json(false);
    }
});

router.delete('/api/post/:id', function(req, res, next){
    try{
        const id = req.params.id;
        const sql = `DELETE FROM posttable WHERE id = ${id}`;
        mysql.query(sql, function(err, posts){
            res.send(posts);
        })
    } catch (e){
        console.log(e);
    }
});







module.exports = router;

