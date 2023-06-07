import './config'; // Load environment variables
import 'express-async-errors'; // Enable default error handling for async errors
import express, { Express } from 'express';
import session from 'express-session';
import connectSqlite3 from 'connect-sqlite3';

import { registerUser, logIn, logOut } from './controllers/UserController';

import { validateNewUserBody, validateLoginBody } from './validators/authValidator';

const app: Express = express();
// app.set('view engine', 'ejs');
const { PORT } = process.env;
// const { PORT, COOKIE_SECRET } = process.env;
const SQLiteStore = connectSqlite3(session);

app.use(express.static('public', { extensions: ['html'] }));

app.use(
  session({
    store: new SQLiteStore({ db: 'sessions.sqlite' }),
    secret: 'Jji*3ZVw177Q',
    // secret: COOKIE_SECRET;
    cookie: { maxAge: 8 * 60 * 60 * 1000 }, // 8 hours
    name: 'session',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post('/register', validateNewUserBody, registerUser); // Create an account
app.post('/login', validateLoginBody, logIn); // Log in to an account
app.get('/login', logOut);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
