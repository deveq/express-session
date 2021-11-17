const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store : new FileStore(),
}))

app.get('/', (req,res) => {
  console.log(req.session);
  if (req.session.num) {
    req.session.num++;
  } else {
    req.session.num = 1;
  }

  res.send(`hello session ${req.session.num}`);
})

app.listen(3000, () => {
  console.log('3000번 포트에서 대기중');
})