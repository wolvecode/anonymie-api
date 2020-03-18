const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const { Admin } = require('../model/admin')
//
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
        //save the information provided by the admin
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
          return done(null, false, { message: 'Invalid password provided' })
        }
        //if password correspond with email, then send
        return done(null, admin, { message: 'login successful' })
      } catch (error) {
        return done(error)
      }
    }
  )
)

//verifies that the token sent by admin is valid, to access a secure route
passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'top_secret',
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.admin)
      } catch (error) {
        done(error)
      }
    }
  )
)
