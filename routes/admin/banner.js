var express = require('express');
var router = express.Router();
let mgdb=require('../../utils/mgdb');


router.post('/',(req,res,next)=>{
    console.log(1)
    // let {title,des,detail,content} = req.body;
    // let time = Date.now()





    let io=require('../../bin/www')
    io.emit('banner_new',{data:'发送数据'})
})


module.exports = router;