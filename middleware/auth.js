const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const { Admin, validate } = require('../model/admin')
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

//create a passport midddleware to handle admin registration
passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const admin = await Admin.create({ email, password })
        return done(null, admin)
      } catch (error) {
        done(error)
      }
    }
  )
)

//create a middleware to handle admin login
passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const admin = await Admin.findOne({ email })
        if (!admin) {
          return done(null, false, { message: 'admin not found' })
        }
        //if admin, then validate password
        const validate = await admin.isValidPassword(password)
        if (!validate) {
          return done(null, false, { message: 'Wrong password, try again' })
        }
        //if password correspond with email, then sedn
        return done(null, admin, { message: 'login successful' })
      } catch (error) {
        return done(error)
      }
    }
  )
)

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'top_secret',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user)
      } catch (error) {
        done(error)
      }
    }
  )
)

// const jwt = require('jsonwebtoken')
// const config = require('config')

// module.exports = function(req, res, next) {
//   const token = req.header('x-auth-token')
//   if (!token) return res.status(401).send('Access denied. No token provided')

//   try {
//     const decoded = jwt.verify(token, config.get('jswPrivateKey'))
//     req.admin = decoded
//     next()
//   } catch (ex) {
//     res.status(400).send('Invalid token')
//   }
// }
