const db =require('../3.databases/mySql')

const getAllData=(req,res)=>{
    let sql = `select * from categories;`
    db.query(sql, (err,result)=>{
        if(err) throw err 
        res.json(result)
    })
}

const deleteCategoryById=(req,res)=>{
    const id = req.params.id
    // check ada child atau enggak
    let sql=`select * from categories where id= ?;`
    db.query(sql,id,(err,result)=>{
        try{
            if(err) throw err
            console.log(result[0].categories_id)            
            let sql = `select * from categories where categories_id = ?;` 
            db.query(sql, id, (err, child)=>{
                if(err) throw err
                if(child.length > 0){
                    console.log(child)
                    child.forEach((val)=>{
                        db.query(`update categories set categories_id =${result[0].categories_id} where id = ` + val.id,(err,result)=>{
                            if(err) throw err
                        })
                    })

                    db.query('delete from categories where id = ?', id, (err,result)=>{
                        if(err) throw err 
                        res.json({message : "success"})
                    })


                }else{
                    db.query('delete from categories where id = ?', id, (err,result)=>{
                        if(err) throw err 
                        res.json({message : "success"})
                    })

                }

            
            })

        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })   

    
}


// edit categories by id
const EditCategoryById=(req,res)=>{
    const data =  req.body
    const id = req.params.id
    let sql = `update categories set ? where id = ?;`
    db.query(sql, [data,id], (err,result)=>{
        if(err) throw err 
        res.json({message : 'Edit data Success'})
    })
}


// add categories 
const addCategoryById=(req,res)=>{
    let sql = `insert into categories set ?;`
    const data =  req.body
    if(data.category){
        
        db.query(sql, data, (err,result)=>{
            if(err) throw err 
            res.send('Success')
        })
    }else{
        res.send('data format invalid')
    }  
}












module.exports = {
   deleteCategoryById : deleteCategoryById,
   getAllData : getAllData,
   EditCategoryById : EditCategoryById,
   addCategoryById : addCategoryById
 }
