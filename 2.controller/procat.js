const db =require('../3.databases/mySql')

// MAnage Product
const getDataJoin=(req,res)=>{
    let sql = `select  pc.id as id, p.nama as nama, category from productcat pc
    join products p on pc.products_id = p.id
    join categories c on pc.categories_id = c.id;`
    db.query(sql, (err,result)=>{
        console.log('masuk')
        if(err) throw err 
        res.json(result)
    })
}




const postProcat=(req,res) => {
    const data = req.body // {productId , categoryId}
    console.log(data)
    let sqlInsert = 'insert into productcat set ?;'
    function getDataParent (id) {
        db.query('select * from categories where id = ' + id,(err,result) => {
            if(err) throw err
            console.log(result)
            db.query(sqlInsert , {products_id : data.products_id, categories_id: result[0].id},(err,result) => {
                if(err) throw err
            })
            if(result[0].categories_id !== null){
                getDataParent(result[0].categories_id)
            }else{
                res.json('success added')
            }
        })
    }

    getDataParent(data.categories_id)
    
    
    


}






module.exports = {
  getDataJoin : getDataJoin,
  postProcat : postProcat
  }