const express = require('express')
const app = express()
const PORT = 4000
const cors = require('cors')

const db = require('./3.databases/mySql')
const productRouter = require('./1.router/product')
const categoryRouter = require('./1.router/category')
const procatRouter = require('./1.router/procat')
db.connect()

app.use(express.json())
app.use(cors())

app.use('/product',productRouter)
app.use('/category',categoryRouter)
app.use('/procat',procatRouter)

app.get('/',(req,res)=>{
    res.send('<h1>Selamat datang di API File Upload System</h1>')
})

// get all categories with parent category
app.get('/categories-parent',(req,res)=>{
    let sql = `select c.id as id, c.category as category, c2.category as parent from categories c
    left join categories c2 on c.categories_id = c2.id;`
    db.query(sql, (err,result)=>{
        if(err) throw err 
        res.json(result)
    })
})

app.get('/category-leaf',(req,res)=>{
    let sql = `SELECT c1.id, c1.category FROM categories c1
        LEFT JOIN categories c2 ON c2.categories_id= c1.id WHERE c2.id IS NULL;`
    db.query(sql, (err,result)=>{
        console.log('masuk')
        if(err) throw err 
        res.json(result)
    })
})

app.listen(PORT,()=>{
    console.log('server running on port' + PORT)
})