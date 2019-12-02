const express = require('express')
const app = express()
const port = 3000
/* test: abcdefghijikkk * Github/

/* Session */
const session = require('express-session');
app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true
}));
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  next();
});

/* Database */
var mysql = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '098098poipoi-',
  database : 'news_stack',
  port: 3306  /* 8889 on Mac client */
});

/* Upload */
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })
var _storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
var upload = multer({ storage: _storage })
app.use('/uploads', express.static('uploads'));

/* URL */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

/* Template */
app.set('view engine','ejs');
app.set('views','./views');
app.locals.moment = require('moment');

/* static */
app.use('/static', express.static('static'));

/* root app */
var root = require('./routes/root.js')(app, conn, upload);
app.use('/', root);

/* news app */
var news = require('./routes/news.js')(app, conn, upload);
app.use('/news', news);

/* account app */
var account = require('./routes/account.js')(app, conn, upload);
app.use('/account', account);

/* admin app */
var account = require('./routes/admin.js')(app, conn, upload);
app.use('/admin', account);

/* Port listening */
app.listen(port, () => console.log(
    `Server is running... http://localhost:${port}`
))



/*댓글달기 창*/
/*router.post('/comment', (req, res) => {
  var comment = req.body.comment;

  var article_Id = req.body.article_Id;

  var sql = 'INSERT INTO comment ('comment', 'article_Id', inserted') VALEUS(?, ?, now());

  conn.query(sql, [comment, articleId], function(err, result, fields){
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error: '+err);
    } else {
      res.redirect('/news/' + articleId);
    
    }
    });
}); router.get*/

function fn_replyReplySave(){
  if ( $.trim($("#rewriter3").val()) == "") {
      alert("작성자를 입력해주세요.");
      $("#rewriter3").focus();
      return;
  }
  if ($.trim($("#rememo3").val()) == "") {
      alert("글 내용을 입력해주세요.");
      $("#rememo3").focus();
      return;
  }
 
  var formData = $("#form3").serialize();
  $.ajax({
      url: "board7ReplySaveAjax4Reply",
      type:"post",
      data : formData,
      success: function(result){
          if (result!=="") {
              var parent = $("#reparent3").val();
              $("#replyItem"+parent).after(result);
              $("#replyDialog").hide();
              alert("저장되었습니다.");
          } else{
              alert("서버에 오류가 있어서 저장되지 않았습니다.");
          }
      }
  })       
}


