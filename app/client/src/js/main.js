import axios from 'axios'
let oH3=document.querySelector("#is-login")
let btnLogin=document.querySelector('#btn-login')


axios({
    method:"get",
    url:"/userinfo"
}).then(ret=>{
    if(Object.keys(ret).length==0){
        oH3.innerHTML="未登录"
        return 
    }
    oH3.innerHTML=ret.data.user.login;
    let oImg=document.createElement('img')
    oImg.src=ret.data.user.avatar_url;
    document.body.append(oImg)
}).catch(err=>{
    console.log('error',err)
})


btnLogin.addEventListener('click',()=>{
    location.href='https://github.com/login/oauth/authorize?client_id=504a7603be0b90a2681b&redirect_uri=http://localhost:8200/login/github/callback'
},false)