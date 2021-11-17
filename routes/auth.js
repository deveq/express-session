const { request } = require('express');
var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');


var authData = {
  email : 'test@test.com',
  password : '123123',
  nickname : 'Jake',
}

router.get('/login', (req,res) => {
  var title = 'WEB - login';
  var list = template.list(req.list);
  var html = template.HTML(title, list,
    `
      <form action="/auth/login_process" method="post">
        <p>
          <input type="text" name="email" placeholder="email">
        </p>
        <p>
          <input type="password" name="pwd" placeholder="password">
        </p>
        <p>
          <input type="submit" value="login">
        </p>
      </form>
    `);
  res.send(html);
})

router.post('/login_process', (req,res) => {
  var post = req.body;
  var email = post.email;
  var password = post.pwd;
  console.log(email, password);

  if (authData.email === email && authData.password === password) {
    req.session.is_logined = true;
    req.session.nickname = authData.nickname;
    res.send('welcome');
  } else {
    res.send('who?')
  }
})


module.exports = router;