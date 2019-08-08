let express = require('express');
let router = express.Router();
let mgdb =require('../../utils/mgdb');
let fs=require('fs')
let path = require('path');
let bcrypt = require('bcrypt') //加密模块

/* GET users listing. */
router.post('/', (req, res, next)=> {
  console.log(1)
  let {username,password,icon,nikename}=req.body;
 
  if(!username || !password){
      res.send({err:1,msg:'用户名密码不能为空'})
      return;
  }
  let follows=0;
  let fans=0;
  let time=Date.now()
  password = bcrypt.hashSync(password, 10); 
  nikename=nikename||'jiuwei1';
  // console.log(req.files)
  if(req.files){
    if(req.files.length>0){
      // this.xx=oo
      fs.renameSync(req.files[0].path,req.files[0].path+path.parse(req.files[0].originalname).ext) 
      icon ='/upload/user/'+req.files[0].filename+path.parse(req.files[0].originalname).ext
    }else{
      icon = '/upload/noimage.png';
    }
  }else{
    icon = '/upload/noimage.png';
  }
  // if(req.files.length>0){
  //   fs.renameSync(req.files[0].path,req.files[0].path+path.parse(req.files[0].originalname).ext) 
  //   icon ='/upload/user/'+req.files[0].filename+path.parse(req.files[0].originalname).ext
  // }else{
  //   icon = '/upload/noimage.png';
  // }
  console.log(2)
  // icon = '/upload/noimage.png';
  mgdb({
    collectionName:'user'
  },(collection,client)=>{
    collection.find({
      username
    },{

    }).toArray((err,result)=>{
      if(!err){
        if(result.length>0){
          res.send({err:1,msg:'用户已注册'})
          if(!icon=='/upload/noimage.png'){
            fs.unlinkSync('./public'+icon);
          }
          // fs.unlinkSync('./public'+icon);
          client.close()
        }else{
            collection.insertOne({username,password,nikename,fans,follows,icon},(err,result)=>{
              if(!err){
                console.log(result)
                res.send({err:0,msg:'注册成功',data:result.ops[0]})
              }else{
                res.send({err:1,msg:'user集合操作失败'})
              client.close()
              }
            })
           
        }
      }else{
        res.send({err:1,msg:'集合操作失败'})
        client.close()
      }
    })
  })
});

module.exports = router;

