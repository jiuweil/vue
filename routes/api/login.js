var express = require('express');
var router = express.Router();
let mgdb = require('../../utils/mgdb');
/* GET users listing. */
let bcrypt=require('bcrypt');


router.post('/', function(req, res, next) {
  console.log(1)
// console.log(req.query)
// console.log(req.body)
  // console.log(req.query._page)
  // console.log(req.query._sort)
  // console.log('files',req.files)
  // console.log('file',req.file)
  let {username,password}=req.body;
  // console.log(username,password)
  if(!username || !password){
    res.send({err:1,msg:'用户名密码不能为空'})
    return;
  }

  mgdb({
    collectionName:'user'
  },(colletion,client)=>{
    colletion.find(
      {
        username
    },{
      projection:{username:0}
    }).toArray((err,result)=>{
      // console.log(err)
      // console.log(result)
      if(!err){
        // console.log(result[0])
        
        // console.log(flag)
        if(result.length>0){
          let flag=bcrypt.compareSync(password,result[0].password) 
          // console.log(1)
          if(flag){
              // axios.defaults.withCredentials = true;
              console.log("111")
              req.session['1905_session'] = result[0]._id;
          // res.send('1')
            res.send({err:0,msg:'登录成功',data:result[0]})
          }else{
            res.send({err:1,msg:'用户名密码不对'})
          }
        }else{
          res.send({err:1,msg:'用户名未注册'})
        }
        client.close()
      }else{
        res.send({err:1,msg:'集合操作失败'})
        client.close()
      }
    })
  })
  // res.send('login');
});

// 查了文档,如果用any(),只能用req.files,我测了好几次，req.file都是undefined，无论有没有传，那他改文件名字的时候
// 这里的file.filename是什么
module.exports = router;
