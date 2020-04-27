const db =require('../3.databases/mySql')

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



module.exports = {
   deleteCategoryById : deleteCategoryById
 }
