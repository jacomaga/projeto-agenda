import validator from 'validator'


export default class Login {
    
    constructor(formClass){
        this.form = document.querySelector(formClass)
        
    }

    init(){
        this.events()
    }

    events(){
        if(!this.form) return
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            console.log()
            this.validar(e)
            
        })
    }

    validar(e){
        
        const el = e.target
        const emailInput = el.querySelector('input[name="email"]')
        const passInput = el.querySelector('input[name="password"]')
        let error = false
        
        if(!validator.isEmail(emailInput.value)){
            this.escreverAlerta(e,"Insira um e-mail válido" )
            error = true
        }
        if(passInput.value.length < 3 || passInput.value.length > 20){
            this.escreverAlerta(e,"Insira uma senha entre 3 a 20 dígitos")
            error = true
        }
        if(!error){
            el.submit()
            const alerta = document.querySelector(".form-cadastro")
            alerta.removeChild("painel-mensagens")
        } 

        
    }

    escreverAlerta(e,texto){
        if(e.srcElement.getAttribute("class") == "form-cadastro"){
            const alerta = document.querySelector("#login-messages")
            
            if(!alerta.textContent.includes(texto)){
                alerta.appendChild(document.createTextNode(texto))
                alerta.appendChild(document.createElement("br"))
            }
        }
    }

}