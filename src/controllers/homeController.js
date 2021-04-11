const Contato = require('../models/contatoModel')

exports.index = async (req,res) => {
    const contatos = await Contato.listarContatos()
    res.render('index', {contatos})
}