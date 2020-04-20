var express = require("express")
var router = express.Router()
var uuid = require('node-uuid');
var url = require("url");
var db = require('../db/index')



router.post('/login',function(req,res){
    const i_sql = 'INSERT INTO user(user_name,user_password,user_phone,user_img) VALUES(?,?,?,?)'
    const s_sql = `SELECT * FROM user WHERE user_phone='${req.body.phone}'`
    db.sql(s_sql).then(
        function(data){
            res.json({
                status:200,
                code:1,
                esg:'手机账号已存在'
            })

        },
        function(resone){
            let url = 'https://dss0.baidu.com/73F1bjeh1BF3odCf/it/u=4154355813,3197755722&fm=85&s=BC2FD214C67A76274402B6D00300C0BD'
            db.insertsql(i_sql,[req.body.name,req.body.password,req.body.phone,url]).then(e=>{
                res.json({
                    status:200,
                    code:0,
                    esg:'注册成功'
                })
            })
        }
    )
  
})

router.post('/sign',function(req,res){
    const s_sql1 = `SELECT * FROM user  WHERE user_phone='${req.body.user}'`
    const s_sql2 = `SELECT * FROM user  WHERE user_phone='${req.body.user}' AND user_password='${req.body.password}'`
    db.sql(s_sql1).then(function(){
        db.sql(s_sql2).then(function(e){
            res.json({
                status:200,
                code:0,
                msg:'登陆成功',
                data:e[0]
            })
        },
        function(){
            res.json({
                status:200,
                code:1,
                msg:'你的账号和密码不匹配'
            })
        }
        )
    },
    function(){
        res.json({
            status:200,
            code:1,
            msg:'账号不存在,请注册'
        })
    }
    )
    
})

router.post('/commit',function(req,res){
    let time = Date.parse(new Date())
    let page_id = uuid.v1().slice(0,8)
    let key = req.body.user_phone?req.body.user_phone:req.body.sign
    const i_sql = 'INSERT INTO artical(user_id,text,name,c_time,page_id,user_img,likes) VALUES(?,?,?,?,?,?,?)'
    db.insertsql(i_sql,[key,req.body.text,req.body.user_name,time,page_id,req.body.user_img,'']).then(e=>{
        res.json({
            status:200,
            msg:'发表成功',
            code:0
        })
    })

})

router.get('/allartical',function(req,res){
    const s_sql = `SELECT * FROM artical`
    db.sql(s_sql).then(e=>{
        res.json({
            status:200,
            code:0,
            data:e
        })
    },
    e=>{
        res.json({
            status:200,
            code:1,
            data:''
        })
    }
    )

})

router.get('/artical',function(req,res){
    let params = url.parse(req.url, true).query;
    const s_sql = `SELECT * FROM artical WHERE user_id='${params.id}'`
    db.sql(s_sql).then(e=>{
        res.json({
            status:200,
            code:0,
            data:e
        })
    },
    e=>{
        res.json({
            status:200,
            code:1,
            data:''
        })
    }
    )
})

router.post('/delete',function(req,res){
    
    const s_del = `DELETE FROM artical WHERE page_id = '${req.body.page_id}'`
    db.delsql(s_del).then(e=>{
        res.json({
            status:200,
            code:0,
            msg:'删除成功'
        })
    })

})

router.post('/approve',function(req,res){
    let likes
    let id = req.body.user_phone?req.body.user_phone:req.body.sign
    let up_sql = `UPDATE artical SET likes = ? WHERE page_id = '${req.body.page_id}'`
    let s_sql = `SELECT * FROM artical WHERE page_id='${req.body.page_id}'`
    db.sql(s_sql).then(e=>{
        if(e[0].likes){
          likes = e[0].likes + ',' + id
        }
        likes = id
        db.upsql(up_sql,likes).then(e=>{
            res.json({
                status:200,
                code:0
            })
        })

    })

})


module.exports = router