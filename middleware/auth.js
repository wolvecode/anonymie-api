const passport = require('passport')
const path = require('path')
const localStrategy = require('passport-local').Strategy
const { Admin } = require('../model/admin')
const JWTstrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

// Load configurations stored on .env to node env.
require('dotenv').config({ path: path.join(__dirname, '.env') })
//create a passport midddleware to handle admin registration
passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      session: false
    },
    async (req, email, password, done) => {
      const fullName = req.body.fullName
      try {
        //Create a new admin
        const admin = await Admin.create({ email, fullName, password })
        return done(null, admin)
      } catch (error) {
        done(error.message)
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
      secretOrKey: 'anoymie_secret',
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
