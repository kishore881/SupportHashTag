require('dotenv').config({ path: './config/.env' })
const PORT = process.env.PORT || 3000;

const express = require('express');
const router = require('./router/index');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(router);

app.listen(PORT);