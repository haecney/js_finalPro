
const express=require('express')
const app=express()
const path=require('path')
const port=3000
const bodyParser=require('body-parser')
const e = require('express')
const sqlite3 = require('sqlite3').verbose()
var islog=0;
app.use(bodyParser.urlencoded({ extended: true }))

const db = new sqlite3.Database('users.db')

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    score INT,
    head TEXT
  )`
)
db.run(`
  CREATE TABLE IF NOT EXISTS admin (
    admin_id INTEGER PRIMARY KEY AUTOINCREMENT,
    adminname TEXT NOT NULL,
    admin_pwd TEXT NOT NULL
  )
  `
)
app.use((req, res, next) => {
  // 定义要拒绝访问的文件路径或文件类型
  const restrictedPaths = ['/game.html'];
  // 获取请求的路径和扩展名
  const requestPath = req.path;
  
 // console.log(restrictedPaths+" "+requestPath)

  // 检查是否在受限制的路径中
  if (restrictedPaths.includes(requestPath) && islog===0) {
    // 如果是受限制的文件，返回 403 Forbidden
    
    return res.status(403).send('Access forbidden');
  }
  // 如果不是受限制的文件，继续处理下一个中间件或路由处理程序
  next();
});

app.use(express.static('16_game'));
app.use(express.json())


//app.use('16_game/rigist.html');
app.get('/',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'16_game','manager.html'))
})

//用户注册路由
app.post('/register', (req, res) => {
    const { username, password } = req.body
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
      if (err) {
        return res.status(500).send("<script> alert('User registered fail') </script>")
      }
      res.send("<script> alert('User registered successfully'); window.location.href='index.html'; </script>")
    })
  })
//用户登录路由
app.post('/login',(req,res)=>{
    const { username, password } = req.body
    db.all('SELECT * FROM users WHERE username=? and password=?', [username, password],(err,rows)=>{
      if (err) {
        return res.status(500).send("<script> alert('User login fail') </script>")
      }
      console.log(rows)
      if (rows.length>0) { islog=1; res.send('1'); } else res.send('-1');
    })
    return;
})
//管理员登陆路由
app.post('/adminLogin',(req,res)=>{
  const { username, password } = req.body
    db.all('SELECT * FROM admin WHERE adminname=? and admin_pwd=?', [username, password],(err,rows)=>{
      if (err) {
        return res.status(500).send("<script> alert('User login fail') </script>")
      }
      if (rows.length>0) { islog=2;   console.log(islog); res.send('2'); return;} 
    })
})


//查看用户路由
app.get('/allUsers',(req,res)=> {
  db.all('SELECT * FROM users',(err,row)=>{
    if (err) {console.log(err.message); return; }
    //console.log(row)
    res.send(row)
  })
})
//查看管理员路由
app.get('/allAdmin',(req,res)=> {
  db.all('SELECT * FROM admin',(err,row)=>{
    if (err) {console.log(err.message); return; }
    console.log(row)
    res.send(row)
  })
})

//更改用户路由
app.post('/change',(req,res)=>{
  const {username, password ,pre_username} = req.body
  db.run('UPDATE users SET username=?,password=?  WHERE username=?', [username, password,pre_username],(err,rows)=>{
    if (err) {
      return res.status(500).send("<script> alert('User update failed') </script>")
    }
    console.log(req.body)
    res.status(200).send("<script> alert('User update success') </script>")
  })
})

//删除用户路由
app.post('/delete',(req,res)=>{
  const {username, password } = req.body
  console.log(req.body)
  db.run('DELETE FROM users WHERE username=?', [username],(err,rows)=>{
    if (err) {
      return res.status(500).send("<script> alert('User update failed') </script>")
    }
    
    res.status(200).send("<script> alert('User update success') </script>")
  })
})


app.listen(port,()=>{
    console.log("server running"+__dirname)
})