var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let multer=require('multer');
let cookieSession=require('cookie-session');
let mgdb=require('./utils/mgdb');
let cors=require('cors')



// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieSession({
  name:'1905_session_id',
  keys:['key1','key2']
}))
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(req.url.indexOf('user')!==-1 || req.url.indexOf('reg')!==-1){
      cb(null, path.join(__dirname,'public', require('./config/path').user.uploadUrl))
    }else if(req.url.indexOf('banner')!==-1){
      cb(null, path.join(__dirname,'public', require('./config/path').banner.uploadUrl))
    }else{
      cb(null, path.join(__dirname,'public',require('./config/path').product.uploadUrl))
    }
  },
  // filename : function (req, file, cb) {
  //   console.log(file)
  // }
})
// console.log(storage.filename)
let multerObj = multer({storage});
// let multerObj = multer({dest:'字符路径'}); //存储方式dest指定死了，storage分目录
// app.use(multerObj.any())
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if(req.url.indexOf('user')!==-1 || req.url.indexOf('reg')!==-1){
//       cb(null, path.join(__dirname, 'public','upload','user'))
//     }else if(req.url.indexOf('banner')!==-1){
//       cb(null, path.join(__dirname, 'public','upload','banner'))
//     }else{
//       cb(null, path.join(__dirname, 'public/upload/product'))
//     }
//   }
// })
// let multerObj = multer({storage});
// let multerObj = multer({dest:'字符路径'}); //存储方式dest指定死了，storage分目录

app.use(multerObj.any())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public','template')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin',express.static(path.join(__dirname, 'public','admin')));



app.use(cors({
  "origin": ['http://10.11.51.238:8080',"http://localhost:8080"],
  "credentials":true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:['Content-Type', 'Authorization']
}));

app.use('/admin',express.static(path.join(__dirname, 'public','admin')));

app.all('/api/*',require('./routes/api/parmas'))
app.use('/api/user',require('./routes/api/user'))


app.use('/admin/banner', require('./routes/admin/banner'));

app.use('/api/login',require('./routes/api/login'))
app.use('/api/reg',require('./routes/api/reg'))
app.use('/api/logout',require('./routes/api/logout'))

app.use('/api/:product',require('./routes/api/product'))
app.use('/api/banner',require('./routes/api/banner'))
app.use('/api/silder',require('./routes/api/silder'))
app.use('/api/sort',require('./routes/api/sort'))
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send({err:1,msg:'找不到接口'});
});



module.exports = app;
