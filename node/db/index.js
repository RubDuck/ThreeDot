var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'00000000',
    database: 'treedot'
})
connection.connect();

module.exports = {
    //查询
    sql : function(getsql){
        return new Promise((res,rej)=>{
            connection.query(getsql,function(err,result){
                if(result&&result.length>0){
                    res(result)
                }
                rej(err)
            })
        }) 
    } ,
    //插入
    insertsql :  function(addSql,addSqlParams){
        return new Promise(function(reslove,reject){
            connection.query(addSql,addSqlParams,function (err, result) {
                if(err){
                reject(err)
                return false
                } 
              reslove(result)
        });
        })
  

    },
    //删除
    delsql:function(delsql){
        return new Promise(function(reslove,reject){
            connection.query(delsql,function(err,result){
                if(err){
                    reject(err)
                    return
                }
                reslove(result)

            })
        })
    },
    //更新数据
    upsql :  function(addSql,addSqlParams){
        return new Promise(function(reslove,reject){
            connection.query(addSql,addSqlParams,function (err, result) {
                if(err){
                    console.log('更新失败')
                reject(err)
                return false
                } 
                console.log('更新成功')
              reslove(result)
        });
        })
  

    },
    
}
