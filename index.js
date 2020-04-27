const express = require('express')
const app = express()
const PORT = 4000
const cors = require('cors')

const db = require('./3.databases/mySql')
const productRouter = require('./1.router/product')
const categoryRouter = require('./1.router/category')
// const procatRouter = require('./1.router/procat')
db.connect()

app.use(express.json())
app.use(cors())

app.use('/product',productRouter)
app.use('/category',categoryRouter)
// app.use('/procat',procatRouter)

app.get('/',(req,res)=>{
    res.send('<h1>Selamat datang di API File Upload System</h1>')
})

app.listen(PORT,()=>{
    console.log('server running on port' + PORT)
})