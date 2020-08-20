const Koa=require('koa')
const app=new Koa()
const http=require('http')
const Router=require('koa-router')
const router=new Router()
const queryString=require('querystring')
const axios=require('axios')
const [clientID,clientSecret]=['504a7603be0b90a2681b','48c9ca5eff4e19b3fdd2d190a902a9517727a97c']
const userinfo={}//应该是读取数据库中的数据，临时使用全局变量替代
router.get('/userinfo',async cxt=>{
    cxt.body=userinfo;
})
router.get('/login/github/callback',async cxt=>{
    let {code}=cxt.query;
    try{
        let ret=await axios.post(`https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`)
    
        const {access_token,token_type}=queryString.parse(ret.data,'&','=')
        let result=await axios({
            url:`https://api.github.com/user`,
            method:"get",
            headers:{
                Authorization:`${token_type} ${access_token}`
            },
            timeout:60000
        })
        cxt.redirect('http://localhost:8080')//前端首页的地址
        userinfo.user=result.data;
    }catch(err){
        console.error('error',err)  
    }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8200,()=>{
    console.log('server is running at port 8200')
})