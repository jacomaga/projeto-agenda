const mongoose = require('mongoose');
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }
    async registrar(){
        this.validar()
        await this.usuarioExiste()
        if(this.errors.length > 0 ) return
        await this.usuarioExiste()
        if(this.errors.length > 0 ) return

        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password,salt)
        this.user = await LoginModel.create(this.body)
    }

    async usuarioExiste(){
        this.user = await LoginModel.findOne({email: this.body.email})
        if(this.user) this.errors.push('Esse usuário já existe!')
    }

    validar(){
        this.limpar()
        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.')
        if(this.body.password.length < 3 || this.body.password.length > 50 ){
            this.errors.push('Escolha uma password contendo de 3 a 50 caracteres.')    
        }
    }

    validarLogin(){
        this.limpar()
    }

    limpar(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }

    async logar(){
        
        this.validarLogin()

        if(this.errors.length > 0) return 
        this.user = await LoginModel.findOne({email: this.body.email})
        
        if(!this.user) {
            this.errors.push('Usuário inexistente')
            return
        }
        
        if (!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha inválida')
            return
        }
    }
}

module.exports = Login;
