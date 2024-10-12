const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');;
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');


const port = process.env.PORT || 3000;
const app = express();

app
  .use(bodyParser.json())
  .use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use(cors({methods:['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
  .use(cors({ origin: '*'}))
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  .use('/', require('./routes'));


process.on('uncaughtException', (err, origin) => {
  console.error(`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
  
  return done(null,profile);
}
))

passport.serializeUser((user,done) => {
  done(null,user);
});

passport.deserializeUser((user,done) => {
  done(null,user);
});

app.get('/',(req,res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', passport.authenticate('github',{
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
});

const startServer = async () => {
  try {
    await mongodb.initDb();
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
      console.log(`Documentação Swagger disponível em http://localhost:${port}/api-docs`);
    });
  } catch (err) {
    console.error('Falha ao iniciar o servidor:', err);
    process.exit(1);
  }
};

startServer();