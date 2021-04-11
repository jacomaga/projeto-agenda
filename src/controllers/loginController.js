const Login = require('../models/LoginModel')
exports.index = (req,res) =>{
    if(req.session.user) return res.render('index')
    res.render('login')
}

exports.register = async function (req,res){
    
    try{
    const login = new Login(req.body)
    await login.registrar()
   
    if(login.errors.length > 0){
        req.flash('errors', login.errors)
        req.session.save(()=>{
            return res.redirect('index')
        })
    }
    req.flash('sucesso', 'Usuário criado com sucesso!')
    req.session.save(()=>{
    return res.redirect('index')
    })
    
    
    } catch(e){
        console.log(e)
        return res.render('404')
    }
} 

exports.login = async function (req,res){
    
    try{
    const login = new Login(req.body)
    await login.logar()
   
    if(login.errors.length > 0){
        req.flash('errorsLogin', login.errors)
        req.session.save(()=>{
            return res.redirect('index')
        })
        return
    }
    if(!login.user){
        req.flash('errorsLogin', login.errors)
        req.session.save(()=>{
            return res.redirect('index')
        })
        return
    }
    req.flash('sucessoLogin', 'Você acessou o sistema com sucesso!')
    req.session.user = login.user
    req.session.save(()=>{
    return res.redirect('/contato/index')
    })
    
    
    } catch(e){
        console.log(e)
        return res.render('404')
    }
}

exports.logout = (req,res)=>{
    req.session.destroy()
    res.redirect('/login/index')
}
