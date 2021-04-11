const { render } = require('ejs')
const Contato = require('../models/contatoModel')
exports.index = (req, res) => {
  res.render('contato', {contato: {}})
  
}

exports.registrar  = async (req,res) =>{
 try{
  const contato = new Contato(req.body)
  await contato.register()

  if(contato.errors.length > 0 ) {
    req.flash('errors', contato.errors)
    req.session.save( () =>{
      res.redirect('/contato/index')
      return
    })
  }else{
    req.flash('sucesso', 'Contato registrado com sucesso')
    req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
    return
  }

  

 }catch(e){
   console.log(e)
 }
}

exports.editarIndex = async(req,res) => {
  if(!req.params.id) return res.render('404')
  
  const contato = await Contato.buscaPorId(req.params.id)

  if(!contato) return res.render('404')

  res.render('contato',{
    contato})
}

exports.editar = async(req,res) => {
  try{ 
    if(!req.params.id) return res.render('404')
    const contato = new Contato(req.body)
    await contato.editar(req.params.id)

    if(contato.errors.length > 0 ) {
      req.flash('errors', contato.errors)
      req.session.save( () =>{
        res.redirect('/contato/index')
        return
      })
    }else{
      req.flash('sucesso', 'Contato editado com sucesso')
      req.session.save(() => res.redirect(`/contato/index/${contato.contato._id}`))
      return
    }
  }catch(e){ 
    console.log(e) 
    res.render('404')
  }
}
exports.deletar = async function(req,res){
  if(!req.params.id) return res.render('404')
  
  const contato = await Contato.deletar(req.params.id)

  if(!contato) return res.render('404')
  
  req.flash('sucesso', 'Contato deletado com sucesso')
  req.session.save(() => res.redirect(`/index`))
  return
}