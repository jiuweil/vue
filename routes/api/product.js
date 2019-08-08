var express = require('express');
var router = express.Router();
let mgdb=require('../../utils/mgdb')

/* GET users listing. */
router.get('/', (req,res,next)=>{
  // res.send('product');
  // console.log(req)
  let apiname=req.rootParams;
  let _id=req.query.id

  if(/list|column|business/.test(apiname)){
    if(!_id){
      listFn({req,res,apiname})
    }else{
      detailFn({req,res,_id,apiname})
    }   
  }else{
    next()
  }

  // console.log(1)
  // console.log(req.rootParams)
});



router.get('/:id',(req,res,next)=>{
  // console.log(1)
  let apiname=req.rootParams;
  let _id=req.params.id
  if(/list|column|business/.test(apiname)){
    detailFn({req,res,_id,apiname})
  }else{
    next()
  }
  // console.log(req.params.id)
  // console.log(req.rootParams)

})

let listFn=({req,res,apiname})=>{
  let {_page,_limit,q,_sort} = req.query;
  console.log(req.query)
  // let des=detail.des;
  let qq = q ? {"detail.des":eval('/'+q+'/')} : {}   ;//仔细看 仔细听
  // sel= sel ? {title:eval('/'+sel+'/')}  : {}
  // console.log(qq)
  console.log(_limit);
  mgdb({
    collectionName:apiname
  },(collection,client)=>{
    collection.find(qq,{
      sort:{[_sort]:1},
      skip: _page * _limit,
      limit:_limit,
    }).toArray((err,result)=>{
      // console.log(result)
      if(!err){
        res.send({err:0,msg:'没有错误',data:result})
      }else{
        res.send({err:1,msg:'集合操作失败'})
      }
      client.close()
    })
  })
}

let detailFn=({req,res,apiname,_id})=>{
  mgdb({collectionName:apiname},(collection,client,ObjectID)=>{
    collection.find({
      _id: ObjectID(_id)
    },{}).toArray((err,result)=>{
      if(!err){
        if(result.length>0){

          console.log('result',result);
          
          res.send({err:0,msg:'查询成功',data:result[0]})
        }else{
          console.log(1)
          res.send({err:1,msg:'没有该数据'})
        }
        client.close()
      }else{
        res.send({err:1,msg:'集合操作失败'})
      }
      client.close()
    })
  })
}



module.exports = router;
