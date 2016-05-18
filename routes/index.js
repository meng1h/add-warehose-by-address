var express = require('express');
var router = express.Router();



var mongodb = require('mongodb');

var server = new mongodb.Server("localhost",27017,{
   auto_reconnect : true
}) ;

var conn = new mongodb.Db("my-address-add",server,{
   safe : true
}) ;



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/index/addressjson',function(req,res,next) {
  conn.open(function(error,db) {
    if(error) throw error ;
    db.collection("xbm-toulai", {
         safe : true
    },function(err,collection) {
      collection.find({},{"_id":false}).toArray(function(e,doc) {
        // console.log(doc[0]);

        res.json(doc[0]);
      }) ; 
    }) ;
  }) ;
});

router.post('/index/warelist',function(req,res,next){
  
  var province = req.body.province ;
  var city = req.body.city;
  var area = req.body.area;

  conn.open(function(error,db) {
    if(error) throw error ;
    db.collection("xbm-ware",{
         safe : true
    },function(err,collection){
      collection.find({province:province,
                        city:city,
                        area:area
                      },{})
        .toArray(function(e,doc) {
          res.json(doc);
        }) ; 
    }) ;
  }) ;
});

router.post('/index/wareadd',function(req,res,next) {

  conn.open(function(error,db) {
    if(error) throw error ;
    db.collection("xbm-ware",{
         safe : true
    },function(err,collection){
      
      console.log('in insert');
      collection.insert(
        req.body
        ,{safe : true}
        ,function(err,result) {
          console.log('err'+err+'result'+result)
          if(!err)
            res.json({'statu':'success'});
          else res.json({'statu':'false'});
        }) ; 
    }) ;
  }) ;
});

module.exports = router;
