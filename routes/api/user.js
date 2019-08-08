var express = require('express');
var router = express.Router();
// var mongodb=require('mongodb')
// let ObjectID = mongodb.ObjectID;
let mgdb=require('../../utils/mgdb')

/* GET users listing. */
router.post('/', function(req, res, next) {
  if(req.session['1905_session']){
    let _id=req.session['1905_session']
    // console.log(req.session['1905_session'])
    mgdb({collectionName:'user'},(collection,client,ObjectID)=>{
      collection.find({
        _id:ObjectID(_id)
      }).toArray((err,result)=>{
        if(!err){
          // console.log(result)
          res.send({err:0,msg:'登录成功',data:result[0]})
        }else{
          res.send({err:1,msg:'集合操作失败'})
        }
      })
    })
    // res.send({err:0,msg:'登录成功',date:})
  }else{
    res.send({err:1,msg:'登录失败'})
  }
});

module.exports = router;
