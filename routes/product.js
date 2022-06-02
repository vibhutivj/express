var express = require('express');
var router = express.Router();
var db = require("../db/database.js")


/* GET home page. */
router.get('/', function(req, res, next) {
  // res.json({"message": "O5k"});
  // res.render('index', { title: 'Express' });
  var sql = req.query.search ?
  "select * from product where productName like '%"+ req.query.search.toLocaleUpperCase() +"%' order by productId limit "+ req.query.pageSize +" offset "+ req.query.offSet +"" : 
  (req.query.pageSize ?
    "select * from product order by productId limit "+ req.query.pageSize +" offset "+ req.query.offSet +"" :
    "select * from product order by productId")

  var countsql = req.query.search ? 
  "select count(*) as totalCount from product where productName like '%"+ req.query.search.toLocaleUpperCase() +"%'" : 
  "select count(*) as totalCount from product";

  var params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      db.all(countsql, params, (err, count) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        
        res.json({
          data: rows,
          totalCount: count
        });
      });
      // res.json(rows);
    });
});


module.exports = router;
