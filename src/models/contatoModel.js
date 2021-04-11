const mongoose = require('mongoose')
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: false, default:'' },
  email: { type: String, required: false, default:'' },
  telefone: { type: String, required: false, default:'' },
  dataCriacao: {type:Date, default: Date.now }
})

Contato.prototype.editar = async function (id){
  if(typeof id !== 'string') return 
  this.validar()
  if(this.errors.length > 0 ) return
  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true})
}
const ContatoModel = mongoose.model('Contato', ContatoSchema)

function Contato(body) {
    this.body = body
    this.errors = []
    this.contato = null 
} 

Contato.prototype.register = async function(){
  this.validar()
  if(this.errors.length > 0 ) return
  this.contato = await ContatoModel.create(this.body)

}

Contato.prototype.limpar = function() {
  for(const key in this.body){
    if(typeof this.body[key] !== 'string'){
        this.body[key] = ''
    }}
this.body = {
    
    nome: this.body.nome,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    telefone: this.body.telefone

  }
}

Contato.prototype.validar = function() {
  this.limpar()
  if(!this.body.nome) this.errors.push('O campo nome é obrigatório.')
  if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.')
  if(!this.body.email && !this.body.telefone) this.errors.push('Preencha pelo menos um contato(e-mail ou telefone)')
}

Contato.buscaPorId = async function(id){
  if(typeof id !== 'string') return 
  const user = await ContatoModel.findById(id)
  return user
}

Contato.listarContatos = async function(){
  const contatos = await ContatoModel.find()
    .sort({dataCriacao:-1})
  return contatos
}

Contato.deletar = async function(id){
  if(typeof id !== 'string') return 
  const contato = await ContatoModel.findOneAndDelete({ _id: id})
  return contato
}



module.exports = Contato;
