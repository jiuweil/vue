module.exports=(req,res,next)=>{

    req.query._page = req.query._page-1 || require('../../config/params')._page-0;
    // req.query._page = req.query._page ? req.query._page-1 : 0;//默认页数1
    req.query._limit = req.query._limit-0 || require('../../config/params')._limit-0;
    req.query.q = req.query.q || require('../../config/params').q;
    req.query._sort = req.query._sort || require('../../config/params')._sort;

    req.body._page = req.body._page ? req.body._page - 1 : 0
    req.body._limit = req.body._limit ? req.body._limit - 0 : require('../../config/params')._limit-0
    req.body.q = req.body.q ? req.body.q : require('../../config/params').q;
    req.body._sort = req.body._sort ? req.body._sort : require('../../config/params')._sort;
  

    req.rootParams = req.params[0].split('/')[0]

    // console.log(req.rootParams)
    

    // res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    // res.setheader("Access-Control-Allow-Origin", "http://10.11.51.238:8080");
    // res.setheader("Access-Control-Allow-Credentials", true);
    // // Access-Control-Allow-Credentials
    // res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header('Access-Control-Allow-Origin', 'http://10.11.51.238:8080'); 
//     res.header('Access-Control-Allow-Credentials', true); // 允许服务器端发送Cookie数据
// //res.header('Access-Control-Allow-Origin', 'www.baidu.com'); //这样写，只有www.baidu.com 可以访问。
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法

    next()
}
// module.exports={
//     _page:0,
//     _limit:10,
//     q:'',
//     _sort:'time'
//   }