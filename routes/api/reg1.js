var express = require('express');
var router = express.Router();
var mgdb=require('../../utils/mgdb');
let fs=require('fs')
let path = require('path');
let bcrypt = require('bcrypt')

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log(1)
    let {username,password,icon}=req.session.body
 
    if(!username || !password){
        res.send({err:1,msg:'用户名密码不能为空'})
        return;
    }
    let follows=0;
    let fans=0;
    let time=Date.now()
    let password = bcrypt.hashSync(password, 10); 
    let nikename=nikename||'jiuwei1';
    if(req.files.length>0){
      fs.renameSync(req.files[0].path,req.files[0].path+path.parse(req.files[0].originalname).ext) 
      icon ='/upload/user/'+req.files[0].filename+path.parse(req.files[0].originalname).ext
    }else{
      icon = '/upload/noimage.png';
    }
    mgdb({
      collectionName:'user'
    },(collection,client)=>{
      collection.find({
        username
      },{
        projection:{
        }
      }).toArray((err,result)=>{
        if(!err){
          if(result.length>0){
            res.send({err:1,msg:'用户已注册'})
            fs.unlinkSync('./public'+icon);
            client.close()
          }else{
              collection.insertOne({username,password,nikename,fans,follows,icon})
              client.close()
          }
        }else{
          res.send({err:1,msg:'集合操作失败'})
          client.close()
        }
      })
    })
})

module.exports = router;
