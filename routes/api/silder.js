var express = require('express');
var router = express.Router();
let mgdb=require('../../utils/mgdb')


    // router.get('/',(req,res,next)=>{
    // let _id=req.query.id;
    // let {_page,_limit,q,_sort} = req.query;
    // // console.log(q)
    //  let qq = q ? {title:eval('/'+q+'/')} : {}   ;//仔细看 仔细听
    //  if(_id){
    //     mgdb({collectionName:'banner'},(collection,client,ObjectID)=>{
    //         collection.find({
    //         _id: ObjectID(_id)
    //         },{
    //         }).toArray((err,result)=>{
    //         if(!err){
    //             if(result.length>0){
    //             res.send({err:0,msg:'查询成功',data:result[0]})
    //             }else{
    //             res.send({err:1,msg:'没有该数据'})
    //             }
    //         }else{
    //             res.send({err:1,msg:'集合操作失败'})
    //         }
    //         client.close()
    //         })
    //     })
    //  }else{
    //       mgdb({collectionName:'banner'},(collection,client,ObjectID)=>{
    //             collection.find(qq,{
    //                 sort:{[_sort]:1},
    //                 skip: _page * _limit,
    //                 limit:_limit,
    //             }).toArray((err,result)=>{
    //                 if(!err){
    //                     res.send({err:0,msg:'没有错误',date:result})
    //                   }else{
    //                     res.send({err:1,msg:'集合操作失败'})
    //                   }
    //                   client.close()
    //             })
    //         })
    //  }
    
    // })
    // router.get('/:id',(req,res,next)=>{
    //     console.log(1)
    //     let _id=req.params.id;
    //     console.log(_id)
    //     mgdb({collectionName:'banner'},(collection,client,ObjectID)=>{
    //         collection.find({
    //         _id: ObjectID(_id)
    //         },{
    //         }).toArray((err,result)=>{
    //         if(!err){
    //             if(result.length>0){
    //             res.send({err:0,msg:'查询成功',data:result[0]})
    //             }else{
    //             res.send({err:1,msg:'没有该数据'})
    //             }
    //         }else{
    //             res.send({err:1,msg:'集合操作失败'})
    //         }
    //         client.close()
    //         })
    //     })
    // })
// router.get('/:_id',(req,res,next)=>{
//     console.log(req.params)
//     let _id = req.params._id;
//     mgdb({
//       url:'mongodb://127.0.0.1:27017',
//       dbName:'1905',
//       collectionName:'banner'
//     },(collection,client,ObjectID)=>{
//       collection.find({
//         _id:ObjectID(_id)
//       }).toArray((err,result)=>{
//         console.log('result',result)
//         if(!err){
//           res.send({err:1,msg:'查无数据',data:result[0]})
//         }
//       })
//     })
//   })
  
// let listFn = ({req,res})=>{
//     // console.log(1)
//     let {_page,_limit,q,_sort} = req.query;
//     let qq = q ? {title:eval('/'+q+'/')} : {}   ;//仔细看 仔细听
//     mgdb({collectionName:'banner'},(collection,client,ObjectID)=>{
//         collection.find(qq,{
//             sort:{[_sort]:1},
//             skip: _page * _limit,
//             limit:_limit,
//         }).toArray((err,result)=>{
//             if(!err){
//                 res.send({err:0,msg:'没有错误',date:result})
//               }else{
//                 res.send({err:1,msg:'集合操作失败'})
//               }
//               client.close()
//         })
//     })
// }
    router.get('/',(req,res,next)=>{
        
        let _id=req.query.id;
        if(req.query.id){
            detailFn({req,res,_id})
        }else{
            listFn({req,res})
        }
    })
    router.get('/:id',(req,res,next)=>{
        let _id=req.params.id;
        detailFn({req,res,_id})

    })

    let listFn=({req,res})=>{
        // console.log(1)
        let {_page,_limit,q,_sort} = req.query;
        let qq = q ? {title:eval('/'+q+'/')} : {}   ;//仔细看 仔细听
        mgdb({collectionName:'silder'},(collection,client,ObjectID)=>{
            collection.find(qq,{
            sort:{[_sort]:1},
            skip: _page * _limit, //分页
            limit:_limit,         //分页
            }).toArray((err,result)=>{
                if(!err){
                    if(result.length>0){
                        console.log(result);
                        res.send({err:0,msg:'查询成功',data:result})
                    }else{
                        res.send({err:1,msg:'没有数据'})
                    }
                 
                    client.close()
                }else{
                    res.send({err:1,msg:'集合操作失败'})
                    client.close()

                }
            })
        })
    }
    let detailFn=({req,res,_id})=>{
        mgdb({collectionName:'silder'},(collection,client,ObjectID)=>{
            collection.find({
                _id:ObjectID(_id)
            },{}).toArray((err,result)=>{
                // console.log(result)
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
                    client.close()
                }
            })
        })
    }





module.exports = router;
