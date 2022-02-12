const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
  // const authenticateUser = async (email, password, done) => {
  const authenticateUser = (email, password, done) => {
    const user = getUserByEmail(email)
    
    /* modificação para debug pra passar direto no login 
       com o usuario criado na inicialização do objeto*/
    return done(null, user)

    // if (user == null) {
    //   return done(null, false, { message: 'No user with that email' })
    // }

    // try {
    //   if (await bcrypt.compare(password, user.password)) {
    //     return done(null, user)
    //   } else {
    //     return done(null, false, { message: 'Password incorrect' })
    //   }
    // } catch (e) {
    //   return done(e)
    // }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize