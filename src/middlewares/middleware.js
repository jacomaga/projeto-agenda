exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors')
  res.locals.sucesso = req.flash('sucesso')
  res.locals.sucessoLogin = req.flash('sucessoLogin')
  res.locals.errorsLogin = req.flash('errorsLogin')
  res.locals.user = req.session.user
  next();
};

exports.outroMiddleware = (req, res, next) => {
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err) {
    return res.render('404');
  }
  next()
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loginRequired = (req,res,next) =>{
  if(!req.session.user){
    req.flash('errorsLogin', 'Você precisa estar logado!')
    req.session.save(() => res.redirect('/login/index'))
    return 
  }
  next()
}
